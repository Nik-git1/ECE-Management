import React, { createContext, useContext, useState } from 'react';
import RequestContext from './RequestContext';
 // Adjust the import path to match your project structure

import  allocated from '../assets/allocated.json'
import borrow from '../assets/borrow.json'

const RequestState = (props) => {
    const [allocatedEquipment, setAllocatedEquipment] = useState(allocated);
    const [requestedEquipment, setRequestedEquipment] = useState(borrow);
    const [returnEquipment, setReturnEqiument] = useState(borrow);
  

  return (
    <RequestContext.Provider value={{ allocatedEquipment,requestedEquipment,returnEquipment }}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default RequestState;
