import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-[#3dafaa] h-screen text-center w-[285px] mt-4'>
      <div className='flex flex-col'>
        <Link to="/" className='bg-[#3dafaa] h-16 p-2 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          Equipment Lists
        </Link>
        <hr className='border-t-2' />
        <Link to="/admin/alloted" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          Alloted Equiments
        </Link>
        <hr className='border-t-2' />
        
        <Link to="/admin/brequest" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          Borrow Request
        </Link>
        <hr className='border-t-2' />
        <Link to="/admin/rrequest" className='bg-[#3dafaa] p-2 h-16 hover:bg-[rgb(50,140,135)] focus:bg-[rgb(50,140,135)] text-white font-bold'>
          Return Request
        </Link>
        <hr className='border-t-2' />
      </div>
    </div>
  );
};

export default SideBar;