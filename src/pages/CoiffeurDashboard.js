import React from "react";
import AddService from "../components/AddService";
import ServiceList from "../components/ServiceList";

const CoiffeurDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login"; // Redirection après déconnexion
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-6">
      {/* Header du tableau de bord */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de bord du coiffeur
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
        >
          Se déconnecter
        </button>
      </div>

      {/* Contenu principal */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
        {/* Composant pour ajouter un service */}
        <AddService />

        <div className="mt-6">
          {/* Liste des services existants */}
          <ServiceList />
        </div>
      </div>
    </div>
  );
};

export default CoiffeurDashboard;
