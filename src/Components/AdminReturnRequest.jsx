import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";

const AdminReturnRequest = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("returning");
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [remark, setRemark] = useState('NA');
  const [requestID, setRequestID] = useState();

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
    setLoading(true); fetchRequests();
  }, [selectedStatus]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `/api/transaction/requests/${selectedStatus}/${user.lab}`
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Error fetching requests:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        setRequestID(requestID);
        setModalIsOpen(true);
      }
    });
  };

  const handleAddRemark = () => {
    closeModal();
    acceptRequest(requestID);
  }

  const acceptRequest = async (requestID) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/transaction/accept/${requestID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ remark }),
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
      setLoading(true);
      const response = await fetch(
        `/api/transaction/decline/${requestID}`,
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
        {selectedStatus === "returning" ? (
          <th className="border p-2 text-center">Action</th>
        ) : <th className="border p-2 text-center">Remark</th>}
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
          {selectedStatus === "returning" ? (
            <td className="border p-2">{
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md items-center"
                  onClick={() => acceptAlert(request._id)}
                >
                  Approve
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md items-center"
                  onClick={() => declineAlert(request._id)}
                >
                  Decline
                </button>
              </div>
              }
            </td>
          ) : (
            <td className="border p-2 text-center">{request?.adminComments}</td>
          )}
        
      </tr>
    );
  };

  return (
    <div>
      <label htmlFor="status">Select Status:</label>
      <select
        id="status"
        className="ml-2 p-2 border border-gray-300 rounded"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="returning">Returning</option>
        <option value="completed">Completed</option>
      </select>
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
      ):(
        <div className='overflow-auto max-w-[82vw] max-h-[82vh]'>
          <table className='w-full border-collapse border'>
            <thead className='sticky top-0'>{renderHeader()}</thead>
            <tbody>
              {requests.map((requestData, index) => renderRow(requestData, index))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Equipment Request Modal"
        // className='modal'
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">Add Remark?</h2>
          <div className="mb-4">
            <label className="block mb-2">Remark:</label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAddRemark}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button
              onClick={handleAddRemark}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminReturnRequest;
