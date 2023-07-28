import React, { useState } from 'react';
import "./FavoritesCard.css";
import { useSelector } from 'react-redux';
import { userData } from '../../pages/userSlice';
import { getMyFavorites } from '../../services/apiCalls';

export const FavoriteCard = () => {
    const user = useSelector(userData);
    const token = useSelector((state) => state.user.credentials.token);
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
          const data = await getMyFavorites(token);
          if (data.success) {
            setFavorites(data.data);
          } else {
            console.log('Error al obtener los favoritos: ' + data.message);
          }
        } catch (error) {
          console.log('Error en la solicitud AJAX: ' + error);
        }
      };

  return (
    <div >
      <button onClick={loadFavorites} className='divTest'>Cargar Favoritos</button>
      <div>
        {favorites.map(favorite => (
          <div key={favorite.id}>
            <h3>{favorite.concert.title}</h3>
            <p>Date: {favorite.concert.date}</p>
            <p>Group Name: {favorite.concert.groupName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
