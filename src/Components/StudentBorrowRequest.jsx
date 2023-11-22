import React from 'react';

const StudentBorrowRequest = () => {
    const columnNames = ['S.No', 'Equipment Name', 'Quantity', 'Date of Request', 'Date of Approval', 'Last Date of Return', 'Status', 'Action'];

    const tableData = [
        { id: 1, equipmentName: 'Laptop', quantity: 2, requestDate: '2023-10-28',approveDate: '--/--',lastReturnDate: '--/--',status: 'Waiting' },
        { id: 2, equipmentName: 'Calculator', quantity: 1, requestDate: '2023-10-26',approveDate: '2023-10-27',lastReturnDate: '2023-11-25',status: 'Approved' },
        { id: 3, equipmentName: 'Registor', quantity: 2, requestDate: '2023-10-20',approveDate: '2023-10-20',lastReturnDate: '--/--',status: 'Declined' },
    ];

    const renderHeader = () => {
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
    
    const renderRow = (data, index) => {
      let textColor;
      if (data.status === 'Waiting') {
        textColor = 'text-yellow-500';
      } else if (data.status === 'Declined') {
        textColor = 'text-red-500';
      } else if (data.status === 'Approved') {
        textColor = 'text-green-500';
      }
  
      return (
        <tr className='text-center' key={index}>
          <td className='border p-2'>{index + 1}</td>
          <td className='border p-2'>{data.equipmentName}</td>
          <td className='border p-2'>{data.quantity}</td>
          <td className='border p-2'>{data.requestDate}</td>
          <td className='border p-2'>{data.approveDate}</td>
          <td className='border p-2'>{data.lastReturnDate}</td>
          <td className={`border p-2 ${textColor}`}>{data.status}</td>
          <td className='border p-2'>
            <div className='flex items-center justify-center'>
              <button className='bg-red-500 text-white px-2 py-1 rounded-md flex items-center mr-1'>
                Cancel Req.
              </button>
            </div>
          </td>
        </tr>
      );
    };

    return(
        <div className='overflow-auto max-w-[83vw] max-h-[1000px] mt-4'>
            <table className='w-full border-collapse border'>
                <thead className='sticky top-0'>{renderHeader()}</thead>
                <tbody>
                    {tableData.map((data, index) => renderRow(data, index))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentBorrowRequest;