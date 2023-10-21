import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import RequestContext from '../Context/RequestContext';
const RequestTable = (props) => {
  const { allocatedEquipment, requestedEquipment, returnEquipment } = useContext(RequestContext);

  // Determine which dataset to use based on props.name
  let equipmentData;
  console.log(props.name)
  if (props.name === 'borrow') {
    equipmentData = requestedEquipment;
  } else if (props.name === 'return') {
    equipmentData = returnEquipment;
  } else {
    equipmentData = allocatedEquipment;
  }
  // Function to extract column names dynamically
  const getColumnNames = () => {
    if (equipmentData.length > 0) {
      return Object.keys(equipmentData[0]);
    }
    return [];
  };

  const columnNames = getColumnNames();

  const getActionButton = (name) => {
    if (name === 'borrow') {
      return {
        label: 'Approve',
        color: 'bg-green-500 text-white px-2 py-1 rounded-md flex items-center ml-2',
        action: () => console.log("allocate"),
      };
    } else if (name === 'return') {
      return {
        label: 'Confirm',
        color: 'bg-green-500 text-white px-2 py-1 rounded-md flex items-center ml-2',
        action: () => console.log("allocate"),
      };
    } else if (name === 'allocate') {
      return {
        label: 'Send Reminder',
        color: 'bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center ml-2',
        action: () => console.log("allocate"),
      };
    }
    return null;
  };

  const renderRow = (equipment, index) => {
    const actionButton = getActionButton(props.name);
    return (
      <tr className="text-center" key={index}>
        {columnNames.map((columnName, ind) => (
          <td className='border p-2' key={ind}>
            {equipment[columnName]}
          </td>
        ))}
        <td className='border p-2'>
          <div className='flex justify-center'>
           <button className={actionButton.color}
            onClick={actionButton.action}>
            {actionButton.label}
           </button>
          </div>
        </td>
      </tr>
    );
  };

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

export default RequestTable;
