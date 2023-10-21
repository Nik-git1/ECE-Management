import React, { useContext } from 'react';
import EquipmentContext from '../Context/EquipmentContext';

const StudentEquipment = () => {
  const { equipmentData } = useContext(EquipmentContext);

  const renderRow = (equipment, index) => {
    return (
      <tr className='text-center' key={index}>
        <td className='border p-2'>{equipment.id}</td>
        <td className='border p-2'>{equipment.equipmentName}</td>
        <td className='border p-2'>{equipment.type}</td>
        <td className='border p-2'>{equipment.quantity}</td>
        <td className='border p-2'>
          <div className='flex items-center justify-center'>
            <button className='bg-green-500 text-white px-2 py-1 rounded-md flex items-center mr-1'>
               Request
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const columnNames = ['ID', 'Equipment Name', 'Type', 'Quantity'];

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
          {equipmentData.map((equipment, index) => renderRow(equipment, index))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentEquipment;
