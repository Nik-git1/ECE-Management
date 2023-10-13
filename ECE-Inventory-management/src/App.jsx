import React from "react";
import EquipmentState from "./Context/EquipmentState"; // Adjust the import path as needed
import EquipmentTable from "./Components/AdminEquipment"; // Import your EquipmentTable component
import AdminPage from "./Pages/AdminPage";
import StudentPage from "./Pages/StudentPage";
import RequestState from "./Context/RequestState";
import LoginPage from "./Pages/LoginPage";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    <RequestState>
      <EquipmentState>
        <Routes>
          <Route element={<AdminPage />} path="/admin/*"></Route>
          <Route element={<StudentPage />} path="/student/*"></Route>
          <Route element={<LoginPage />} path="/"></Route>
        </Routes>
      </EquipmentState>
    </RequestState>
  );
};

export default App;
