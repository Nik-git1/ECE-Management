import React from "react";
import EquipmentState from "./Context/EquipmentState"; // Adjust the import path as needed
import EquipmentTable from "./Components/AdminEquipment"; // Import your EquipmentTable component
import AdminPage from "./Pages/AdminPage";
import StudentPage from "./Pages/StudentPage";
import RequestState from "./Context/RequestState";
import AuthState from "./Context/AuthState";
import Login from "./Pages/Login"

import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    <AuthState>
    <RequestState>
      <EquipmentState>
        <Routes>
          <Route element={<AdminPage />} path="/admin/*"></Route>
          <Route element={<StudentPage />} path="/student/*"></Route>
          <Route element={<Login />} path="/"></Route>
        </Routes>
      </EquipmentState>
    </RequestState>
    </AuthState>
  );
};

export default App;
