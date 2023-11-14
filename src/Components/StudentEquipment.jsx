import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const StudentEquipment = () => {
  const [equipmentData, setEquipmentData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [requestedDays, setRequestedDays] = useState(1);
  const [request, setRequest] = useState(null);
  const [selectedLab, setSelectedLab] = useState("lab1");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sendRequest = () => {
    const selectedEquipment = equipmentData.find(
      (equipment) => equipment.id === request.id
    );
    const requestObj = {
      id: request.id,
      equipmentName: selectedEquipment.equipmentName,
      days: requestedDays,
      quantity: requestedQuantity,
    };
    console.log("Request:", requestObj);
    setRequest(requestObj);
    closeModal();
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/equipment/equipments"
      );
      const data = await response.json();
      setEquipmentData(data);
      console.log(data);
      console.log("hello");
    } catch (error) {
      console.error("Error fetching equipment data: ", error);
    }
  };

  const renderRow = (equipment, index) => {
    if (equipment.lab === selectedLab) {
      return (
        <tr className="text-center" key={equipment._id}>
          <td className="border p-2">{equipment._id}</td>
          <td className="border p-2">{equipment.name}</td>
          <td className="border p-2">None</td>
          <td className="border p-2">{equipment.quantity}</td>
          <td className="border p-2">
            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center mr-1"
                onClick={() => {
                  openModal();
                  setRequest({ id: equipment._id });
                }}
              >
                Request
              </button>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  const columnNames = ["ID", "Equipment Name", "Type", "Quantity", "Action"];

  const renderHeaderRow = () => {
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

  return (
    <div className="overflow-auto max-w-[83vw] max-h-[1000px] mt-4">
      <div>
        <button
          className={`${
            selectedLab === "lab1"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mr-2`}
          onClick={() => setSelectedLab("lab1")}
        >
          Lab 1
        </button>
        <button
          className={`${
            selectedLab === "lab2"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mr-2`}
          onClick={() => setSelectedLab("lab2")}
        >
          Lab 2
        </button>
        <button
          className={`${
            selectedLab === "lab3"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded`}
          onClick={() => setSelectedLab("lab3")}
        >
          Lab 3
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead className="sticky top-0">{renderHeaderRow()}</thead>
        <tbody>
          {equipmentData &&
            equipmentData.map((equipment, index) =>
              renderRow(equipment, index)
            )}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Equipment Request Modal"
        // className='modal'
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">Request Equipment</h2>
          <div className="mb-4">
            <label className="block mb-2">Quantity:</label>
            <input
              type="number"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Number of Days:</label>
            <input
              type="number"
              value={requestedDays}
              onChange={(e) => setRequestedDays(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={sendRequest}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send Request
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentEquipment;
