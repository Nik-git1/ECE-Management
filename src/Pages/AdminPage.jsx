import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar.jsx';
import EquipmentTable from '../Components/AdminEquipment.jsx';
import AdminAllotedEquiments from '../Components/AdminAllotedEquiments.jsx';
import AdminBorrowRequest from '../Components/AdminBorrowRequest.jsx'
import AdminReturnReqest from '../Components/AdminReturnRequest.jsx'
import SideBar from '../Components/AdminSidebar.jsx';
import Login from '../Components/Login.jsx'

const AdminPage = () => {
  return (
    // <div>
    //   <Login />
    // </div>
    <div>
      <AdminNavbar />
      <div className="flex">
        <div className="w-1/6 min-w-[300px]">
          <SideBar />
        </div>
        <div className="flex-1">
          <Routes>
            <Route element={<EquipmentTable />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<AdminAllotedEquiments />} path="/admin/alloted" />
            <Route element={<AdminBorrowRequest />} path="/admin/brequest" />
            <Route element={<AdminReturnReqest />} path="/admin/rrequest" />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;