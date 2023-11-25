import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const StudentEquipment = ({ user }) => {
  const [equipmentData, setEquipmentData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [requestedDays, setRequestedDays] = useState(1);
  const [request, setRequest] = useState(null);
  const [selectedLab, setSelectedLab] = useState("lab1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const sendRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/transaction/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.id, // Replace with the actual studentId
            equipmentId: request.id,
            quantity: requestedQuantity,
            daysToUse: requestedDays,
            lab: selectedLab,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error(errorData.error);
      }

      // Handle success, you can update the UI or take other actions if needed
      console.log("Request sent successfully");
      closeModal();
    } catch (error) {
      console.error("Error sending request:", error.message);
      // Handle the error, show a notification, or take other actions as needed
    }
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
    } catch (error) {
      console.error("Error fetching equipment data: ", error);
    }
  };

 
  const renderRow = (equipment, index) => {
    console.log(selectedTypes)
    const isTypeSelected = selectedTypes.length === 0 || selectedTypes.includes(equipment.type);

    if (
      equipment.lab === selectedLab &&
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isTypeSelected // if it is inclueded in that list
    ) {
      const serialNumber = index + 1;
      return (
        <tr className="text-center" key={equipment._id}>
          <td className="border p-2">{serialNumber}</td>
          <td className="border p-2">{equipment.name}</td>
          <td className="border p-2">{equipment.descrption}</td>
          <td className="border p-2">{equipment.type}</td>
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

  const columnNames = [
    "ID",
    "Equipment Name",
    "Description",
    "Type",
    "Quantity",
    "Action",
  ];

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

  const openFilterModal = () => {
    setShowFilterModal(true);
  };
  

  return (
    <div className="overflow-auto max-w-[83vw] max-h-[1000px] mt-4">
      <div className="flex items-center  mb-4">
        <div className="flex items-center">
          <label className="block mb-0 mr-2">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={openFilterModal}
          className="bg-gray-300 text-gray-600 px-16 py-2 rounded ml-2"
        >
          Filter
        </button>
      </div>
      <Modal
        isOpen={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
        contentLabel="Equipment Filter Modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2 className="text-2xl font-bold mb-4">Filter Equipment Types</h2>
          
          {/* Checkboxes for each equipment type */}
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes("Capacitor")}
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes("Capacitor")
                      ? prev.filter((t) => t !== "Capacitor")
                      : [...prev, "Capacitor"]
                  )
                }
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2">Capacitor</span>
            </label>
          </div>
  
          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes("Resistors")}
                onChange={() =>
                  setSelectedTypes((prev) =>
                    prev.includes("Resistor")
                      ? prev.filter((t) => t !== "Resistors")
                      : [...prev, "Resistors"]
                  )
                }
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2">Resistors</span>
            </label>
          </div>
  
        
          <button
            onClick={() => setShowFilterModal(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Apply Filters
          </button>
        </div>
      </Modal>

      <div>
        <button
          className={`${
            selectedLab === "lab1"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mr-2 mb-2`}
          onClick={() => setSelectedLab("lab1")}
        >
          Lab 1
        </button>
        <button
          className={`${
            selectedLab === "lab2"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mr-2 mb-2`}
          onClick={() => setSelectedLab("lab2")}
        >
          Lab 2
        </button>
        <button
          className={`${
            selectedLab === "lab3"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mr-2 mb-2`}
          onClick={() => setSelectedLab("lab3")}
        >
          Lab 3
        </button>
        <button
          className={`${
            selectedLab === "lab4"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } px-4 py-2 rounded mb-2`}
          onClick={() => setSelectedLab("lab4")}
        >
          Lab 4
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
