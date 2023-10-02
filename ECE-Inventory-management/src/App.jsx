import React from 'react';
import  EquipmentState  from './Context/EquipmentState'; // Adjust the import path as needed
import EquipmentTable from './Components/AdminEquipment'; // Import your EquipmentTable component
import AdminPage from './Pages/AdminPage';
const App = () => {
  return (
    <EquipmentState> 
        <AdminPage />
    </EquipmentState>
  );
};

export default App;
