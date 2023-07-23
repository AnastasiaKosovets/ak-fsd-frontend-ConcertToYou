import React, { useEffect, useState } from "react";
import "./MyTickets.css";
import { getMyTickets } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);

  useEffect(() => {
    // console.log("-----", token)
    const fetchBookings = async () => {
      try {
        const bookingsData = await getMyTickets(token);
        console.log(bookingsData)
        setBookings(bookingsData.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div>
      <h1>Mis Tickets</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>ID del concierto: {booking.concert_id}</p>
              <p>Título del concierto: {booking.concert.title}</p>
              <p>Fecha del concierto: {booking.concert.date}</p>
              <p>Nombre del grupo: {booking.concert.groupName}</p>
              <p>
                Nombre del usuario: {booking.user.firstName}{" "}
                {booking.user.lastName}
              </p>
              <p>Código de reserva: {booking.reservation_code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
