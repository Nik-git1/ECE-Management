import React, { createContext, useContext, useState } from 'react';
import EquipmentContext from './EquipmentContext';
 // Adjust the import path to match your project structure

import  jsondata from '../assets/equi.json'

const EquipmentState = (props) => {
  const [equipmentData, setEquipmentData] = useState(jsondata);

  return (
    <EquipmentContext.Provider value={{ equipmentData, setEquipmentData }}>
      {props.children}
    </EquipmentContext.Provider>
  );
};

export default EquipmentState;
