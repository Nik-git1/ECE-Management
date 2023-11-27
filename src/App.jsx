import React from "react";
import EquipmentState from "./Context/EquipmentState"; // Adjust the import path as needed
import EquipmentTable from "./Components/AdminEquipment"; // Import your EquipmentTable component
import AdminPage from "./Pages/AdminPage";
import StudentPage from "./Pages/StudentPage";
import RequestState from "./Context/RequestState";
import AuthState from "./Context/AuthState";
import Login from "./Pages/Login"
import Register from "./Pages/RegisterPage"

import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes";
const App = () => {
  return (
    <AuthState>
    <RequestState>
      <EquipmentState>
        <Routes>
        <Route
                element={
                  <ProtectedRoute
                    element={<AdminPage />}
                    allowedRoles={['admin']}
                  />
                }
                path="/admin/*"
              />
               <Route
                element={
                  <ProtectedRoute
                    element={<StudentPage />}
                    allowedRoles={['student']}
                  />
                }
                path="/student/*"
              />
         <Route element={<Login />} path="/"></Route>
          <Route element={<Register />} path="/Register"></Route>
        </Routes>
      </EquipmentState>
    </RequestState>
    </AuthState>
  );
};

export default App;
