import React, { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { PiCheckBold } from 'react-icons/pi';
import Swal from 'sweetalert2';

const EquipmentTable = () => {
  const [equipmentData, setEquipmentData] = useState([]); // Set initial state as an empty array
  const [editingRow, setEditingRow] = useState(-1);

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/equipment/equipments');
      const data = await response.json();
      setEquipmentData(data);
    } catch (error) {
      console.error('Error fetching equipment data: ', error);
    }
  };

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = async (rowIndex) => {
    try {
      const selectedEquipment = equipmentData[rowIndex];
      const response = await fetch(`http://localhost:3000/api/equipment/equipments/${selectedEquipment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEquipment),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire('Updated!', data.message, 'success');
      } else {
        Swal.fire('Error!', data.error, 'error');
      }

      fetchEquipmentData();
      setEditingRow(-1);
    } catch (error) {
      console.error('Error updating equipment data: ', error);
    }
  };

  const handleCancel = () => {
    setEditingRow(-1);
  };

  const handleDelete = (rowIndex) => {
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
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(rowIndex);
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const renderRow = (equipment, index) => {
    const isEditing = index === editingRow;
    const editingRowClass = 'bg-gray-300';

    const handleFieldChange = (e, field) => {
      const updatedEquipmentData = [...equipmentData];
      updatedEquipmentData[index][field] = e.target.value;
      setEquipmentData(updatedEquipmentData);
    };

    return (
      <tr className={`text-center ${isEditing ? editingRowClass : ''}`} key={equipment._id}>
        <td className='border p-2'>{equipment._id}</td>
        <td className='border p-2'>
          {isEditing ? (
            <input value={equipment.name} onChange={(e) => handleFieldChange(e, 'name')} />
          ) : (
            equipment.name
          )}
        </td>
        <td className='border p-2'>
          {isEditing ? (
            <input value={equipment.lab} onChange={(e) => handleFieldChange(e, 'lab')} />
          ) : (
            equipment.lab
          )}
        </td>
        <td className='border p-2'>
          {isEditing ? (
            <input value={equipment.description} onChange={(e) => handleFieldChange(e, 'description')} />
          ) : (
            equipment.description
          )}
        </td>
        <td className='border p-2'>
          {isEditing ? (
            <input value={equipment.quantity} onChange={(e) => handleFieldChange(e, 'quantity')} />
          ) : (
            equipment.quantity
          )}
        </td>
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

  const columnNames = ['ID', 'Equipment Name', 'Lab', 'Description', 'Quantity'];

  const renderHeaderRow = () => {
    return (
      <tr className='bg-[#3dafaa] text-white'>
        {columnNames.map((columnName, index) => (
          <th className='border p-2 text-center' key={index}>
            {columnName}
          </th>
        ))}
        <th className='border p-2 text-center'>Action</th>
      </tr>
    );
  };

  return (
    <div className='overflow-auto max-w-[83vw] max-h-[1000px] mt-4'>
      <table className='w-full border-collapse border'>
        <thead className='sticky top-0'>{renderHeaderRow()}</thead>
        <tbody>
          {equipmentData &&
            equipmentData.map((equipment, index) => renderRow(equipment, index))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
