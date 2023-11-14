import React, { useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { PiCheckBold } from 'react-icons/pi';
import Swal from 'sweetalert2';

const EquipmentTable = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [editingRow, setEditingRow] = useState(-1);
  const [addingEquipment, setAddingEquipment] = useState(false);

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

  const handleDelete = async (rowIndex) => {
    const selectedEquipment = equipmentData[rowIndex];
    const response = await fetch(`http://localhost:3000/api/equipment/equipments/${selectedEquipment._id}`, {
        method: 'DELETE'
      });
    fetchEquipmentData();
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

  const handleAddEquipment = () => {
    setAddingEquipment(true);
  };

  const renderAddRow = () => {
    return (
      <tr className={`text-center ${addingEquipment ? 'bg-gray-300' : ''}`} key="add-row">
        <td className='border p-2'>New</td>
        <td className='border p-2'>
          <input id="newName" placeholder="Enter name" />
        </td>
        <td className='border p-2'>
          <input id="newLab" placeholder="Enter lab" />
        </td>
        <td className='border p-2'>
          <input id="newDescription" placeholder="Enter description" />
        </td>
        <td className='border p-2'>
          <input id="newQuantity" placeholder="Enter quantity" />
        </td>
        <td className='border p-2'>
          <div className='flex justify-center'>
            <button
              className='bg-green-500 text-white px-2 py-1 rounded-md flex items-center mr-1'
              onClick={() => handleSaveNewEquipment()}
            >
              <PiCheckBold /> Add
            </button>
            <button
              className='bg-red-500 text-white px-2 py-1 rounded-md flex items-center'
              onClick={() => handleCancelNewEquipment()}
            >
              <RxCross2 /> Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  };
  

  const handleSaveNewEquipment = async () => {
    try {
      // Collect data from input fields
      const name = document.getElementById('newName').value;
      const lab = document.getElementById('newLab').value.toLowerCase();
      const description = document.getElementById('newDescription').value;
      const quantity = document.getElementById('newQuantity').value;
      const allotmentDays = 0;
      console.log(lab);
      // Make sure all required fields are filled
      if (!name || !lab || !description || !quantity) {
        Swal.fire('Error!', 'Please fill in all required fields.', 'error');
        return;
      }

      if(lab !== 'lab1' && lab !== 'lab2' && lab !== 'lab3'){
        Swal.fire('Error!', 'Lab could be either lab1, lab2 or lab3.', 'error');
        return;
      }

      // Send a POST request to the backend to add new equipment
      const response = await fetch('http://localhost:3000/api/equipment/equipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lab, description, quantity, allotmentDays }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Swal.fire('Added!', data.message, 'success');
      } else {
        Swal.fire('Error!', data.error, 'error');
      }
  
      // Reset the state and fetch the updated equipment data
      setAddingEquipment(false);
      fetchEquipmentData();
    } catch (error) {
      console.error('Error adding new equipment: ', error);
    }
  };
  

  const handleCancelNewEquipment = () => {
    // Reset the state when canceling the addition of new equipment
    setAddingEquipment(false);
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
          <div className='flex justify-center'>
            {isEditing ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const renderHeaderRow = () => {
    const columnNames = ['ID', 'Equipment Name', 'Lab', 'Description', 'Quantity', 'Action'];

    return (
      <tr className='bg-[#3dafaa] text-white'>
        {columnNames.map((columnName, index) => (
          <th className='border p-2 text-center' key={index}>
            {columnName}
          </th>
        ))}
      </tr>
    );
  };

  return (
    <div className=''>
      <div className=''>
        <div className='flex justify-end'>
          <button
            className='rounded-full bg-[#3dafaa] text-white border-2 border-[#3dafaa] py-1 px-3 mt-2 mb-1 mr-1 hover:bg-white hover:text-[#3dafaa]'
            onClick={handleAddEquipment}
          >
            Add Equipment
          </button>
        </div>
        <div className='overflow-auto max-w-[83vw] max-h-[1000px]'>
          <table className='w-full border-collapse border'>
            <thead className='sticky top-0'>{renderHeaderRow()}</thead>
            <tbody>
              {addingEquipment && renderAddRow()}
              {equipmentData.map((equipment, index) => renderRow(equipment, index))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EquipmentTable;
