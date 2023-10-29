import React, { useContext, useEffect, useState } from 'react';
import EquipmentContext from '../Context/EquipmentContext'; // Import the EquipmentContext
import { BiSolidEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { PiCheckBold } from 'react-icons/pi';
import Swal from 'sweetalert2';
import axios from 'axios';

const EquipmentTable = () => {
  const getData = async () => {
    try {
      const response = await axios.get("/api/equipment/");
      setEquipmentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []); 

  const { equipmentData, setEquipmentData } = useContext(EquipmentContext);
  const [editingRow, setEditingRow] = useState(-1);

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = (rowIndex) => {
    Swal.fire(
      'Updated!',
      'Your data has been updated successfully.',
      'success'
    )
    const updatedEquipment = [...equipmentData];
    updatedEquipment[rowIndex] = { ...equipmentData[rowIndex] }; // Clone the original data
    setEquipmentData(updatedEquipment);
    setEditingRow(-1); // Reset editing state
  };

  const handleCancel = () => {
    setEditingRow(-1);
  };

  const handleDelete = (rowIndex) => {
    // Implement your delete logic here
    // For demo purposes, we'll directly update the equipment data
    const updatedEquipment = [...equipmentData];
    updatedEquipment.splice(rowIndex, 1);
    setEquipmentData(updatedEquipment);
  };

  const deleteAlert = (rowIndex) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(rowIndex);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  const renderRow = (equipment, index) => {
    const isEditing = index === editingRow;
    const editingRowClass = 'bg-gray-300'; // Define the CSS class for the editing row background color
  
    return (
      <tr className={`text-center ${isEditing ? editingRowClass : ''}`} key={index}>
        {Object.keys(equipment).map((key, ind) => (
          <td className='border p-2' key={ind}>
            {isEditing ? (
              <input
                type='text'
                value={equipmentData[index][key]}
                onChange={(e) => {
                  const updatedEquipment = [...equipmentData];
                  updatedEquipment[index][key] = e.target.value;
                  setEquipmentData(updatedEquipment);
                }}
              />
            ) : (
              equipmentData[index][key]
            )}
          </td>
        ))}
        <td className='border p-2'>
          {isEditing ? (
            <div className='flex justify-center'>
              <button
                className='bg-green-500 text-white px-2 py-1 rounded-md flex items-center mr-1'
                onClick={() => handleSave(index)}
              >
                <PiCheckBold /> Save
              </button>
              <button
                className='bg-red-500 text-white px-2 py-1 rounded-md flex items-center'
                onClick={handleCancel}
              >
                <RxCross2 /> Cancel
              </button>
            </div>
          ) : (
            <div className='flex justify-center'>
              <button
                className='bg-blue-500 text-white px-2 py-1 rounded-md flex items-center mr-1'
                onClick={() => handleEdit(index)}
              >
                <BiSolidEditAlt /> Edit
              </button>
              <button
                className='bg-red-500 text-white px-2 py-1 rounded-md flex items-center'
                onClick={() => deleteAlert(index)}
              >
                <RiDeleteBin6Line /> Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };
  const columnNames = ["ID", "Equipment Name", "Type", "Quantity"];

  const renderHeaderRow = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        {columnNames.map((columnName, index) => (
          <th className='border p-2 text-center' key={index}>{columnName}</th>
        ))}
        <th className='border p-2 text-center'>Action</th>
      </tr>
    );
  };

  return (
    <div className='overflow-auto max-w-[83vw] max-h-[1000px] mt-4'>
      <table className="w-full border-collapse border">
        <thead className='sticky top-0'>
          {renderHeaderRow()}
        </thead>
        <tbody>
          {equipmentData.map((equipment, index) => (
            renderRow(equipment, index)
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
