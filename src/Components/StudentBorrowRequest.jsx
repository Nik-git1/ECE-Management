import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const StudentBorrowRequest = ({ user }) => {
  const [loading, setLoading] = useState(true);
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
   const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        `/api/transaction/requests/delete`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId }),
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
    setLoading(true); fetchRequestData();
  }, []);

  const fetchRequestData = async () => {
    const status = ["requested", "accepted", "declined"];
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        `/api/transaction/srequests/${user.id}?status=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },

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
      setLoading(false);
      // } else {
      //   console.error(
      //     "Error fetching requests: Request or equipments array is empty",
      //     data
      //   );
      // }
    } catch (error) {
      setLoading(false);
      alert(error);
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
    const formattedReturnDate = new Date(request.returnDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    const formattedStartDate = new Date(
      request.startDate
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

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
        <td className="border p-2">{formattedStartDate}</td>
        <td className="border p-2">{formattedReturnDate}</td>
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
      <div className="overflow-auto max-w-[83vw] max-h-[82vh] mt-4">
        <table className="w-full border-collapse border">
          <thead className="sticky top-0">{renderHeader()}</thead>
          <tbody>{tableData.map((data, index) => renderRow(data, index))}</tbody>
        </table>
      </div>
    )}
    </>
  );
};

export default StudentBorrowRequest;
