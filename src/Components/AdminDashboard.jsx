import React, { useEffect, useState } from "react";
const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch all students from the API
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/students");
      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
      } else {
        console.error("Error fetching students:", data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const disableStudent = async (studentId) => {
    // Implement the logic to disable a student
    // You can send a request to your API endpoint to update the student status
    // Example: await fetch(`http://localhost:3000/api/students/disable/${studentId}`, { method: 'PUT' });

    // After disabling the student, you may want to refresh the student list
    fetchStudents();
  };

  const renderHeader = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        <th className="border p-2 text-center">S.No</th>
        <th className="border p-2 text-center">Full Name</th>
        <th className="border p-2 text-center">Email</th>
        <th className="border p-2 text-center">Roll Number</th>
        <th className="border p-2 text-center">Enrollment Date</th>
        <th className="border p-2 text-center">Contact Number</th>
        <th className="border p-2 text-center">Action</th>
      </tr>
    );
  };

  const renderRow = (student, index) => {
    return (
      <tr key={index}>
        <td className="border p-2 text-center">{index + 1}</td>
        <td className="border p-2 text-center">{student.fullName}</td>
        <td className="border p-2 text-center">{student.email}</td>
        <td className="border p-2 text-center">{student.rollNumber}</td>
        <td className="border p-2 text-center">
          {new Date(student.enrollmentDate).toLocaleDateString()}
        </td>
        <td className="border p-2 text-center">{student.contactNumber}</td>
        <td className="border p-2 text-center">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md items-center"
            onClick={() => disableStudent(student._id)}
          >
            Clear Dues
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Student List</h2>
      <table className="w-full overflow-auto">
        <thead>{renderHeader()}</thead>
        <tbody>
          {students.map((student, index) => renderRow(student, index))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
