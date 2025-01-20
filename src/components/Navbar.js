// Frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.jpeg"; // Assurez-vous que le logo est placé dans le bon dossier

const Navbar = () => {
  return (
    <nav className="bg-pink-200 p-4 shadow-md"> {/* Couleur de fond adaptée */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et titre */}
        <Link to="/" className="text-pink-900 text-2xl font-extrabold flex items-center space-x-2"> {/* Texte dans une teinte rose foncé */}
          <img src={logo} alt="BeautyOncall Logo" className="h-8 w-8 rounded-full" />
          <span>BeautyOncall</span>
        </Link>

        {/* Liens */}
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-pink-900 hover:text-pink-600"> {/* Liens en rose foncé avec hover en rose clair */}
            <HomeIcon className="h-5 w-5" />
            <span>Accueil</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-2 text-pink-900 hover:text-pink-600">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Se connecter</span>
          </Link>
          <Link to="/register" className="flex items-center space-x-2 text-pink-900 hover:text-pink-600">
            <UserPlusIcon className="h-5 w-5" />
            <span>Inscription</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
