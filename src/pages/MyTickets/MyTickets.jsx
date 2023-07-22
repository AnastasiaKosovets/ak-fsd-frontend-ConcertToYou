import React, { useEffect, useState } from "react";
import "./MyTickets.css"
import { getMyTickets } from "../../services/apiCalls";

export const MyTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchMyTickets = async () => {
        try {
          // Aquí obtienes el token de autenticación (puedes obtenerlo del estado o props)
          const token = 'TU_TOKEN_DE_AUTENTICACION';
          
          // Llama a la función para obtener los tickets
          const userData = {}; // Asegúrate de pasar los datos necesarios para la solicitud (si es necesario)
          const response = await getMyTickets(userData, token);
  
          // Verifica si la solicitud fue exitosa y guarda los datos en el estado
          if (response.success) {
            setTickets(response.data);
          } else {
            console.error(response.message);
          }
        } catch (error) {
          console.error('Error al obtener los tickets:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMyTickets();
    }, []);
  
    // Renderiza la lista de tickets
    return (
      <div>
        <h1>Mis Tickets</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                {/* Aquí muestras la información de cada ticket */}
                {/* Por ejemplo: ticket.title, ticket.date, ticket.groupName, etc. */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}