import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './../components/Navbar';

const BookingPage = () => {
  const { serviceId } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);

      // Vérifiez les valeurs nécessaires
      if (!token) {
        alert("Vous devez vous connecter avant de réserver.");
        navigate("/login");
        return;
      }


      if (!date || !serviceId) {
        alert("Veuillez remplir tous les champs requis.");
        return;
      }
      const mDate = new Date(date+' ' +time)
      const bookingData = {
        service: serviceId,
        date: mDate,
        notes,
      };

      console.log("Données de la réservation:", bookingData);

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Réservation ajoutée avec succès!");
        navigate("/"); // Rediriger vers la page d'accueil
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation:", error.response?.data || error.message);
      alert("Échec de l'ajout de la réservation. Essayez à nouveau.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200">
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
            Réserver un service de coiffure
          </h1>
          <form onSubmit={handleBooking}>
            <div className="mb-6">
              <label htmlFor="date" className="block mb-2 font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="time" className="block mb-2 font-medium text-gray-700">
                Heure
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="notes" className="block mb-2 font-medium text-gray-700">
                Remarques
              </label>
              <textarea
                id="notes"
                value={notes}
                required
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
