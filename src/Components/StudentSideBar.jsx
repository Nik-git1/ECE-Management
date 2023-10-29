import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-[#3dafaa] h-screen text-center w-[285px] mt-4'>
      <div className='flex flex-col'>
        <Link to="/student" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          DashBoard
        </Link>
        <hr className='border-t-2' />
        <Link to="/student/equipments" className='bg-[#3dafaa] h-16 p-2 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          Equipments List
        </Link>
        <hr className='border-t-2' />
        <Link to="/student/brequest" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
            Borrow Request
        </Link>
        <hr className='border-t-2' />
        <Link to="/student/feedback" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
            Demand Equipment
        </Link>
        <hr className='border-t-2' />
      </div>
    </div>
  );
};

export default SideBar;