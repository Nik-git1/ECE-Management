import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedGraduationYear, setSelectedGraduationYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all students from the API
    setLoading(true); fetchStudents();
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Error fetching students:", error);
    }
  };

  const disableStudent = async (studentId, studentEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to clear dues of ${studentEmail} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear Dues",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:3000/api/auth/disableStudent`, { method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentID: studentId })});  
        fetchStudents();  
      }
    });

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
        <th className="border p-2 text-center">Branch</th>
        <th className="border p-2 text-center">Batch</th>
        <th className="border p-2 text-center">Graduation Year</th>
        <th className="border p-2 text-center">Action</th>
      </tr>
    );
  };

  const renderRow = (student, index) => {
    const isBatchSelected =
      selectedBatch === "" || student.graduationType === selectedBatch; 

    const isBranchSelected =
      selectedBranch === "" || student.branch === selectedBranch;
    const isGraduationYearSelected =
      selectedGraduationYear === "" ||
      student.graduationYear === parseInt(selectedGraduationYear);

    if (isBatchSelected && isBranchSelected && isGraduationYearSelected) {
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
          <td className="border p-2 text-center">{student.branch}</td>
          <td className="border p-2 text-center">{student.graduationType}</td>
          <td className="border p-2 text-center">{student.graduationYear}</td>
          <td className="border p-2 text-center">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md items-center"
              onClick={() => disableStudent(student._id,student.email)}
            >
              Clear Dues
            </button>
          </td>
        </tr>
      );
    }
    return null;
  };

  const renderFilterOptions = (options, setSelectedOption, selectedOption) => (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <>
    {loading ? (
      <div className="flex justify-center">
        <ClipLoader
          color={'#3dafaa'}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    ) : (
      <div>
        <h2>Student List</h2>
        <div className="flex items-center mb-4">
          <div className="mr-2">
            <label className="block mb-0">Batch:</label>
            {renderFilterOptions(
              ['btech', 'mtech', 'phd'], // Replace with actual batch options
              setSelectedBatch,
              selectedBatch
            )}
          </div>
          <div className="mr-2">
            <label className="block mb-0">Branch:</label>
            {renderFilterOptions(
              ['cse', 'csb', 'csam', 'csd', 'ece', 'csss', 'vlsi','csai'], // Replace with actual branch options
              setSelectedBranch,
              selectedBranch
            )}
          </div>
          <div>
            <label className="block mb-0">Graduation Year:</label>
            {renderFilterOptions(
              ["2023", "2024", "2025", "2026", "2027", "2028", "2029"],
              setSelectedGraduationYear,
              selectedGraduationYear
            )}
          </div>
        </div>
        <div className="overflow-auto max-w-[82vw] max-h-[80vh]">
          <table className="w-full border-collapse border">
            <thead className="sticky top-0">{renderHeader()}</thead>
            <tbody>
              {students.map((student, index) => renderRow(student, index))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminDashboard;
