import React from "react";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

export const Profile = () => {
    // Usamos useSelector para obtener los datos del usuario del estado de Redux
    const user = useSelector(userData);
    // const firstName = user.data.firstName;
    console.log(user);

    return (
        // Aquí puedes mostrar los datos del usuario en la página de perfil
        <div>
            <h1>Perfil del usuario</h1>
            {/* <p>Nombre: {user.firstName}</p> */}
            <p>Rol: {user.role_id}</p>
            <p>Email: {user.email}</p>
            <p>Nombre: {user.firstName}</p>
        </div>
    );
}
