import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFilePdf, FaLayerGroup, FaScissors, FaPencil } from 'react-icons/fa6';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: FaFilePdf },
    { path: '/merge', label: 'Merge PDFs', icon: FaLayerGroup },
    { path: '/split', label: 'Split PDF', icon: FaScissors },
    { path: '/edit', label: 'Edit PDF', icon: FaPencil },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaFilePdf className="text-red-600 text-2xl" />
            <span className="font-bold text-xl">PDF Manager</span>
          </Link>
          <div className="flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === path
                    ? 'bg-red-100 text-red-600'
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;