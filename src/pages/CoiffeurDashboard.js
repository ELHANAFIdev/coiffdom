import React from "react";
import AddService from './../components/AddService';
import ServiceList from './../components/ServiceList';

const CoiffeurDashboard = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord du coiffeur</h1>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
        <AddService />
        <ServiceList />
      </div>
    </div>
  );
};

export default CoiffeurDashboard;
