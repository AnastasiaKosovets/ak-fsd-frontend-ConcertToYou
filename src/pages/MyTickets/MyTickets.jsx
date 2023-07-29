import React, { useEffect, useState } from "react";
import "./MyTickets.css";
import { getMyTickets } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Card } from "react-bootstrap";
import Spinner from "../../../img/Spinner.gif"

export const MyTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(userData);
  const token = useSelector((state) => state.user.credentials.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getMyTickets(token);
        // Verificamos si bookingsData.data es un array antes de actualizar el estado
        if (Array.isArray(bookingsData.data)) {
          setBookings(bookingsData.data);
        } else {
          setBookings([]); 
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, [token]);

  return (
    <div className="ticketsGenStyle" style={{ fontFamily: "Great Vibes" }}>
    <h1>Mis Entradas</h1>
    {loading ? (
      <p>
        <img src={Spinner} alt="Loading..." className="" />
      </p>
    ) : (
      <div className="cardStyleTicket">
        {bookings.length === 0 ? (
          <p className="noTickets">No hay entradas disponibles.</p>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="productCardDesignT">
              <Card.Body>
                <Card.Text className="cardText">
                  Título: {booking.concert.title}
                </Card.Text>
                <Card.Text className="cardText">
                  Fecha: {booking.concert.date}
                </Card.Text>
                <Card.Text className="cardText">
                  Grupo: {booking.concert.groupName}
                </Card.Text>
                <Card.Text className="cardText">
                  Código de reserva: {booking.reservation_code}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    )}
  </div>
  );
};
