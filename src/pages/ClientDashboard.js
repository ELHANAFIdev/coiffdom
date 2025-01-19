import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleBooking = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bienvenue dans votre tableau de bord
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            Se déconnecter
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
            Services Disponibles
          </h2>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={`http://localhost:5000/${service.photo}`}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        <strong>Date :</strong>{" "}
                        {new Date(service.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Utilisateur :</strong> {service?.userId?.name}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      {service.name}
                    </p>
                    <p className="text-gray-600">{service.description}</p>
                    <p className="text-gray-800 font-bold">
                      Prix : {service.price} MAD
                    </p>
                    <button
                      onClick={() => handleBooking(service._id)}
                      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 transition"
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
