import React from 'react';
import RequestTable from './RequestTable'; // Import the EquipmentTable component

const AdminBorrowRequest = () => {
  return (
    <div>
      <h2>AdminBorrowRequest</h2>
      <RequestTable name="borrow" />
    </div>
  );
};

export default AdminBorrowRequest;
