// Frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/outline"; // أيقونات من Heroicons

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* شعار التطبيق */}
        <Link to="/" className="text-white text-2xl font-extrabold flex items-center space-x-2">
          <span>CoiffDom</span>
        </Link>

        {/* روابط التنقل */}
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-white hover:underline">
            <HomeIcon className="h-5 w-5" />
            <span> Accueil</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 text-white hover:underline">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Se connecter</span>
          </Link>
          <Link to="/register" className="flex items-center space-x-2 text-white hover:underline">
            <UserPlusIcon className="h-5 w-5" />
            <span>Inscription</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
