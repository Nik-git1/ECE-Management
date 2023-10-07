import React from "react";
import EquipmentState from "./Context/EquipmentState"; // Adjust the import path as needed
import EquipmentTable from "./Components/AdminEquipment"; // Import your EquipmentTable component
import AdminPage from "./Pages/AdminPage";
import RequestState from "./Context/RequestState";
const App = () => {
  return (
    <RequestState>
      <EquipmentState>
        <AdminPage />
      </EquipmentState>
    </RequestState>
  );
};

export default App;
