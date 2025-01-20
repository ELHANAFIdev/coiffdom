import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fonction pour récupérer les services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Appel à l'API pour récupérer les services
        const response = await axios.get("http://localhost:5000/api/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(response.data);
      } catch (err) {
        setError("Échec du chargement des services.");
      }
    };

    fetchServices();
  }, [navigate]);

  // Fonction pour se déconnecter
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Fonction pour réserver un service
  const handleBooking = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header du tableau de bord */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Bienvenue dans votre tableau de bord
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition"
          >
            Se déconnecter
          </button>
        </div>

        {/* Message d'erreur si applicable */}
        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        {/* Liste des services */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Services Disponibles
          </h2>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  {/* Image du service */}
                  <img
                    src={`http://localhost:5000/${service.photo}`}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    {/* Détails du service */}
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        <strong>Date :</strong>{" "}
                        {new Date(service.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Utilisateur :</strong> {service?.userId?.name}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      {service.name}
                    </p>
                    <p className="text-gray-700">{service.description}</p>
                    <p className="text-green-600 font-bold">
                      Prix : {service.price} MAD
                    </p>
                    {/* Bouton de réservation */}
                    <button
                      onClick={() => handleBooking(service._id)}
                      className="mt-4 bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 transition"
                    >
                      Réserver Maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Aucun service disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
