import React, { useState, useEffect } from 'react';
import StudentData from '../src/users.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListingStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setStudents(StudentData.students);
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePopup = (student = null, edit = false) => {
    setCurrentStudent(student || {
      id: students.length + 1,
      name: '',
      address: '',
      city: '',
      country: ''
    });
    setIsEdit(edit);
    setShowPopup(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStudents(prevStudents => 
      isEdit ? prevStudents.map(student =>
        student.id === currentStudent.id ? currentStudent : student
      ) : [...prevStudents, currentStudent]
    );
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="listing_student">
      <h2>Student Details</h2>

      <input
        type="text" className="search" placeholder="Search by name..." value={searchQuery} onChange={handleSearch} 
      />
      <br />
      <button className="add_button" onClick={() => handlePopup(null, false)}>
        Add New Student
      </button>
      <br />
      <table className="student_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>{student.city}</td>
              <td>{student.country}</td>
              <td>
                <button className="icon_button_view_button" onClick={() => handlePopup(student, false)}
                >
                  <FontAwesomeIcon icon={faEye} style={{ color: 'green' }} />
                </button>
                <button className="icon_button edit_button" onClick={() => handlePopup(student, true)}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                </button>
                <button className="icon_button delete_button" onClick={() => setStudents(prev => prev.filter(stu => stu.id !== student.id))}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup_content">
            <h3>{isEdit ? 'Edit Student' : 'Add Student'}</h3>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Name"value={currentStudent.name}onChange={handleInputChange}
                required
              />
              <input type="text" name="address"placeholder="Address" value={currentStudent.address} onChange={handleInputChange}
                required
              />
              <input type="text" name="city" placeholder="City" value={currentStudent.city} onChange={handleInputChange}
                required
              />
              <input type="text" name="country" placeholder="Country"value={currentStudent.country}onChange={handleInputChange}
                required
              />
              <button type="submit" className="submit_button">
                {isEdit ? 'Update' : 'Add'}
              </button>
              <br />
              <button type="button" className="cancel_button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingStudent;
