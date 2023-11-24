import React, { useEffect, useState } from "react";

const StudentBorrowRequest = ({user}) => {
  const columnNames = [
    "S.No",
    "Equipment Name",
    "Lab",
    "Quantity",
    "Date of Request",
    "Last Date of Return",
    "Status",
    "Action",
  ];

  const [tableData, setTableData] = useState([]);

  const deleteRequest = async (transactionId, userId) => {
    console.log(userId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/requests/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId, userId }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error(errorData.error);
      }
  
      // Deletion was successful, now fetch updated data
      await fetchRequestData();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };
  

  useEffect(() => {
    fetchRequestData();
  }, []);

  const fetchRequestData = async () => {
   
    const status = ["requested", "accepted", "declined"];
    try {
      const response = await fetch(
        `http://localhost:3000/api/transaction/srequests/${user.id}?status=${status}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Response from backend:", data);

      // Ensure that data.request and data.equipments are arrays
      const requestsArray = Array.isArray(data.requests) ? data.requests : [];
      const equipmentsArray = Array.isArray(data.equipments)
        ? data.equipments
        : [];

      const requestDataArray = requestsArray.map((request, index) => {
        return {
          request: requestsArray[index] || {},
          equipment: equipmentsArray[index] || {},
        };
      });

      // Check if requestDataArray is not empty before updating the state
      // if (requestDataArray.length > 0) {
        setTableData(requestDataArray);
      // } else {
      //   console.error(
      //     "Error fetching requests: Request or equipments array is empty",
      //     data
      //   );
      // }
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

  const renderRow = (data, index) => {
    const { equipment, request } = data;

    let textColor;
    if (request.status === "requested") {
      textColor = "text-yellow-500";
    } else if (request.status === "declined") {
      textColor = "text-red-500";
    } else if (request.status === "accepted") {
      textColor = "text-green-500";
    }

    return (
      <tr className="text-center" key={index}>
        <td className="border p-2">{index + 1}</td>
        <td className="border p-2">{equipment.name}</td>
        <td className="border p-2">{request.lab}</td>
        <td className="border p-2">{request.quantity}</td>
        <td className="border p-2">{request.startDate}</td>
        <td className="border p-2">{request.returnDate}</td>
        <td className={`border p-2 ${textColor}`}>{request.status}</td>
        <td className="border p-2">
          <div className="flex items-center justify-center">
          <button
                className="bg-red-500 text-white px-2 py-1 rounded-md items-center"
                onClick={() => deleteRequest(request._id, user.id)}
              >
                Cancel
              </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-auto max-w-[83vw] max-h-[1000px] mt-4">
      <table className="w-full border-collapse border">
        <thead className="sticky top-0">{renderHeader()}</thead>
        <tbody>{tableData.map((data, index) => renderRow(data, index))}</tbody>
      </table>
    </div>
  );
};

export default StudentBorrowRequest;
