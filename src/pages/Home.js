// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Navbar from './../components/Navbar';

const Home = () => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-pink-100 to-red-100"> {/* Dégradé en rose et rouge */}
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        {/* Image d'arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <img
            src="/images/home-background.jpg"
            alt="Arrière-plan"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold text-pink-900 mb-6 text-center shadow-md">
          Bienvenue sur l'application <span className="text-red-600">BeautyOncall</span>
        </h1>
        {/* Description */}
        <p className="text-lg text-gray-800 mb-10 text-center max-w-lg px-4">
          L'application <span className="text-red-600 font-semibold">BeautyOncall</span> vous permet de réserver des services de coiffure à domicile en toute simplicité.
        </p>
        {/* Boutons */}
        <div className="flex space-x-6">
          <Link
            to="/register"
            className="flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <UserPlusIcon className="h-6 w-6" />
            <span>S'inscrire</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span>Se connecter</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
