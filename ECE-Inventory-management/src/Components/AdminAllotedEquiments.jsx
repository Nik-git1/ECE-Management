import React from 'react';
import RequestTable from './RequestTable'; // Import the EquipmentTable component

const AdminBorrowRequest = () => {
  return (
    <div>
      <h2>AdminAllotedEquiments</h2>
      <RequestTable name="allocate" />
    </div>
  );
};

export default AdminBorrowRequest;
