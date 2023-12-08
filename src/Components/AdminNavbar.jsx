import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  // const location = useLocation();
  // const isStudent = location.pathname === '/student';

  // const [navBarURL, setNAvBarURL] = useState('/admin/equipment');
  // if(isStudent){
  //   setNAvBarURL('/student')
  // }
  // else{
  //   setNAvBarURL('/admin/equipment')
  // }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:5173");
  };

  return (
    <nav className="bg-white p-5 shadow md:flex md:items-center md:justify-between">
      
      <div>
        <span className='text-2x1 font-bold text-[#3dafaa] flex'>
          <a href="/admin/equipment"><img className='h-10 inline mr-2' src="/Images/ECE_logo_header_new.png" alt="Fail to load" /></a>
          <div className=''>
            <a href="/admin/equipment">INVENTORY MANAGEMENT SYSTEM</a>
          </div>
        </span>
      </div>
      <ul className='md:flex md:items-center'>
        <li className='mx-4'>
          <a href="https://ecelabs.iiitd.edu.in/"target='_blank' className='text-x1 text-[#3dafaa] hover:text-black duration-500'>ABOUT</a>
        </li>
        <button className='rounded-full bg-[#3dafaa] text-white py-1 px-3 hover:bg-red-500'
          onClick={handleLogout}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
