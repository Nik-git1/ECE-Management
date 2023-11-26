import { useEffect, useState } from "react";
// Import the EquipmentTable component

const AdminBorrowRequest = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const columnNames = [
    "S.No",
    "Equipment Name",
    "Student Email ID",
    "Contact",
    "Request Date",
    "Quantity",
    "Expected return Date",
    "Retuned On",
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const status = ["accepted","returning"];
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/requests/${status}/${user.lab}`
      );
      const data = await response.json();

      const requestsArray = data.Rrequests || [];
      const studentsArray = data.students || [];
      const equipmentsArray = data.equipments || [];

      const requestDataArray = requestsArray.map((request, index) => {
        return {
          request: requestsArray[index] || {},
          student: studentsArray[index] || {},
          equipment: equipmentsArray[index] || {},
        };
      });

      setRequests(requestDataArray);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const renderHeader = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        {columnNames.map((columnName, index) => (
          <th className="border p-2 text-center" key={index}>
            {columnName}
          </th>
        ))}
      </tr>
    );
  };

  const renderRow = (requestData, index) => {
    const { equipment, student, request } = requestData;
    const formattedReturnedOn = new Date(request.returnedOn).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    const formattedStartDate = new Date(request.startDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    const formattedreturndate = new Date(request.returnDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    return (
      <tr key={index}>
        <td className="border p-2 text-center">{index + 1}</td>
        <td className="border p-2 text-center">{equipment?.name}</td>
        <td className="border p-2 text-center">{student?.email}</td>
        <td className="border p-2 text-center">{student?.contactNumber}</td>
        <td className="border p-2 text-center">{formattedStartDate}</td>
        <td className="border p-2 text-center">{request?.quantity}</td>
        <td className="border p-2 text-center">{formattedreturndate}</td>
        <td className="border p-2 text-center">{formattedReturnedOn}</td>
        <td className="border p-2"></td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Admin Borrow Request</h2>
      <table className="w-full overflow-auto">
        <thead>{renderHeader()}</thead>
        <tbody>
          {requests.map((requestData, index) => renderRow(requestData, index))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBorrowRequest;
