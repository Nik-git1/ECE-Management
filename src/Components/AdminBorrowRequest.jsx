import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminBorrowRequest = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const columnNames = [
    "S.No",
    "Equipment Name",
    "Student Email ID",
    "Contact",
    "Request Date",
    "Quantity",
    "Return Date",
    "Action",
  ];

  useEffect(() => {
    console.log(user);
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const status = "requested";
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/requests/${status}/${user.lab}`
      );
      const data = await response.json();
      console.log(data);

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

  const acceptAlert = (requestID) => {
    Swal.fire({
      title: "Accept the request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptRequest(requestID);
      }
    });
  };

  const acceptRequest = async (requestID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/accept/${requestID}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error(errorData.error);
      }

      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const declineRequest = async (requestID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/decline/${requestID}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error(errorData.error);
      }

      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const declineAlert = (requestID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this decline!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Decline The Request",
    }).then((result) => {
      if (result.isConfirmed) {
        declineRequest(requestID);
      }
    });
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
    const formattedreturndate = new Date(request.returnDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    const formattedstartDate = new Date(request.startDate).toLocaleDateString(
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
        <td className="border p-2 text-center">{formattedstartDate}</td>
        <td className="border p-2 text-center">{request?.quantity}</td>
        <td className="border p-2 text-center">{formattedreturndate}</td>
        <td className="border p-2">
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md items-center"
              onClick={() => acceptAlert(request._id)}
            >
              Accept
            </button>

            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md items-center"
              onClick={() => declineAlert(request._id)}
            >
              Decline
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table className="w-full overflow-auto mt-4">
        <thead>{renderHeader()}</thead>
        <tbody>
          {requests.map((requestData, index) => renderRow(requestData, index))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBorrowRequest;
