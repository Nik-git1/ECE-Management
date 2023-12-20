import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const StudentDashBoard = ({ user }) => {
  const [tableData, setTableData] = useState([]);
  const [returnedTable, setReturnedTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnButtonLoader, setReturnButtonLoader] = useState(false);

  useEffect(() => {
    setLoading(true); fetchRequestData();
    returnedData();
  }, []);


  const fetchRequestData = async () => {
    const statuses = ["accepted", "returning"]; // Use an array for multiple statuses
    const statusQueryParam = statuses.join(",");
    const token= localStorage.getItem("token")
    try {
      const response = await fetch(
        `/api/transaction/srequests/${user.id}?status=${statusQueryParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // Ensure that data.requests and data.equipments are arrays
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
      if (requestDataArray.length > 0) {
        setTableData(requestDataArray);
      } 
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Error fetching requests:", error);
    }
  };

  const sendReturnRequest = async (transactionId) => {
    const token = localStorage.getItem("token")
    try {
      setLoading(true);
      const response = await fetch(
        "/api/transaction/return",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: user.id, // Replace with the actual studentId
            transactionId: transactionId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error(errorData.error);
      }
      fetchRequestData();
      setLoading(false);
    } catch (error) {
      console.error("Error sending request:", error.message);
      // Handle the error, show a notification, or take other actions as needed
    }
  };

  const returnedData = async () => {
    const statuses = ["completed"]; // Use an array for multiple statuses
    const statusQueryParam = statuses.join(",");
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        `/api/transaction/srequests/${user.id}?status=${statusQueryParam}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // Ensure that data.requests and data.equipments are arrays
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
      if (requestDataArray.length > 0) {
        setReturnedTable(requestDataArray);
      } else {
        console.error(
          "Error fetching requests: Request or equipments array is empty",
          data
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Error fetching requests:", error);
    }
  };

  const columnNames = [
    "S.No",
    "Equipment Name",
    "lab",
    "Quantity",
    "Last date of Return",
    "Action",
  ];
  const returnedHeader = [
    "S.No",
    "Equipment Name",
    "Quantity",
    "Lab",
    "Retuned On",
  ];

  const renderEquipedRow = (data, index) => {
    const { equipment, request } = data;
    const formattedReturnedOn = new Date(request.returnDate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    return (
      returnButtonLoader ? (
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
        <tr className="text-center" key={index}>
          <td className="border p-2">{index + 1}</td>
          <td className="border p-2">{equipment.name}</td>
          <td className="border p-2">{request.lab}</td>
          <td className="border p-2">{request.quantity}</td>
          <td className="border p-2">{formattedReturnedOn}</td>
          <td className="border p-2">
            <div className="flex items-center justify-center">
              {request.status === "returning" ? (
                <span className="text-yellow-500">Waiting for Approval</span>
              ) : (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center mr-1"
                  onClick={() => sendReturnRequest(request._id)}
                >
                  Return
                </button>
              )}
            </div>
          </td>
        </tr>
      )
    );    
  };

  const renderReturnedRow = (data, index) => {
    const { equipment, request } = data;
    const formattedReturnedOn = new Date(request.returnedOn).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
    return (
      <tr className="text-center" key={index}>
        <td className="border p-2">{index + 1}</td>
        <td className="border p-2">{equipment.name}</td>
        <td className="border p-2">{request.quantity}</td>
        <td className="border p-2">{request.lab}</td>
        <td className="border p-2">{formattedReturnedOn}</td>
      </tr>
    );
  };

  const renderEquipedHeader = () => {
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

  const renderReturnedHeader = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        {returnedHeader.map((columnName, index) => (
          <th className="border p-2 text-center" key={index}>
            {columnName}
          </th>
        ))}
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
      <div className="mt-4">
        <div className="flex justify-center">
          <h3 className="font-bold text-3xl text-[#3dafaa]">Equiped Items</h3>
        </div>
        <div className="overflow-auto max-w-[83vw] max-h-[30vh]">
          <table className="w-full border-collapse border">
            <thead className="sticky top-0">{renderEquipedHeader()}</thead>
            <tbody>
              {tableData.map((data, index) => renderEquipedRow(data, index))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <h3 className="font-bold text-3xl text-[#3dafaa]">Returned Items</h3>
        </div>
        <div className="overflow-auto max-w-[83vw] max-h-[30vh]">
          <table className="w-full border-collapse border">
            <thead className="sticky top-0">{renderReturnedHeader()}</thead>
            <tbody>
              {returnedTable.map((data, index) => renderReturnedRow(data, index))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </>
  );
};

export default StudentDashBoard;
