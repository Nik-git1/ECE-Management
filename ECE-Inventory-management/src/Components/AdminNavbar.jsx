import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-[#3dafaa] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img
            src="/logo.png" // Replace with the path to your logo image
            alt="Logo"
            className="w-8 h-8"
          />

          {/* Site Title */}
          <h1 className="text-white text-lg font-semibold">Inventory Management</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a
              href="/admin/equipment-list" // Replace with the actual link
              className="text-white hover:underline"
            >
              Equipment List
            </a>
          </li>
          <li>
            <a
              href="/admin/dashboard" // Replace with the actual link
              className="text-white hover:underline"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/admin/about" // Replace with the actual link
              className="text-white hover:underline"
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
