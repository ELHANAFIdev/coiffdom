import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/services/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setServices(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Services proposés</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : services.length === 0 ? (
        <p>Aucun service disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-100"
            >
              <img
                src={`http://localhost:5000/${service.photo}`}
                alt={service.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.name}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Prix: {service.price} MAD
                </p>
                <p className="text-gray-600 mt-1">Durée: {service.duration} minutes</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
