// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // الإصدار الجديد
import Navbar from './../components/Navbar';

const Home = () => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-200 to-green-200">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <img
            src="/images/home-background.jpg"
            alt="Arrière-plan"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-lg">
          Bienvenue sur l'application <span className="text-blue-600">coiffDom</span>
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-lg px-4">
          L'application <span className="text-blue-600 font-semibold">coiffDom</span> vous permet de réserver des services de coiffure à domicile en toute simplicité.
        </p>
        <div className="flex space-x-6">
          <Link
            to="/register"
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <UserPlusIcon className="h-6 w-6" />
            <span>S'inscrire</span>
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
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
