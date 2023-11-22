import React, { useEffect, useState } from 'react';

const AdminBorrowRequest = () => {
  const [requests, setRequests] = useState([]);

  const columnNames = [
    'S.No',
    'Equipment Id',
    'Equipment Name',
    'Student Name',
    'Roll no.',
    'Graduation Type',
    'Request Time',
    'Quantity',
    'Requested for',
    'Action'
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/transaction/requests'); // Update the URL accordingly
      const data = await response.json();

      // Assuming the response structure is an object with a 'data' property containing an array
      const requestDataArray = data.data || [];

      setRequests(requestDataArray);
      console.log(requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

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

  const renderRow = (requestData, index) => {
    const { equipment, student, requests } = requestData;

    return (
      <tr key={index}>
        <td className='border p-2 text-center'>{index + 1}</td>
        <td className='border p-2 text-center'>{equipment?._id}</td>
        <td className='border p-2 text-center'>{equipment?.name}</td>
        <td className='border p-2 text-center'>{student?.fullName}</td>
        <td className='border p-2 text-center'>{student?.rollNumber}</td>
        <td className='border p-2 text-center'>{student?.graduation_type}</td>
        <td className='border p-2 text-center'>{requests?.startDate}</td>
        <td className='border p-2 text-center'>{requests?.quantity}</td>
        <td className='border p-2 text-center'>{requests?.returnDate}</td>
        <td className='border p-2'> 
          <div className='flex justify-between'>
            <button className='bg-green-500 text-white px-2 py-1 rounded-md items-center'>
              Accept
            </button>
            <button className='bg-red-500 text-white px-2 py-1 rounded-md items-center'>
              Decline
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2>AdminBorrowRequest</h2>
      <table className='w-full'>
        <thead>{renderHeader()}</thead>
        <tbody>
          {requests.map((requestData, index) => renderRow(requestData, index))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBorrowRequest;
