import React from "react";
import { Routes, Route } from 'react-router-dom';
import EquipmentState from "./Context/EquipmentState"; // Adjust the import path as needed
import EquipmentTable from "./Components/AdminEquipment"; // Import your EquipmentTable component
import AdminPage from "./Pages/AdminPage";
import RequestState from "./Context/RequestState";
import Login from './Components/Login.jsx'
import StudentPage from "./Pages/StudentPage";
const App = () => {
  return (
    <RequestState>
      <EquipmentState>
        {/* <StudentPage/> */}
        <AdminPage/>
        {/* <Routes>
          <Route element={<Login />} path="/login" />
        </Routes> */}
      </EquipmentState>
    </RequestState>
  );
};

export default App;
