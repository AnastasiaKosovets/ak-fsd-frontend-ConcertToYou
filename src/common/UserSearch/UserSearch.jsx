import React, { useState } from "react";
import "./UserSearch.css";
import { searchUser } from "../../services/adminCalls";
import { useSelector } from "react-redux";
import { ProductCard } from "../Card/Card";

export const UserSearch = () => {
  const token = useSelector((state) => state.user.credentials.token);
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    searchUser(firstName, lastName, token)
      .then((data) => {
        setUserData(data.data);
        setError(null);
      })
      .catch((error) => {
        setError("User not found", error.message);
        setUserData(null);
      });
  };

  return (
    <div>
      <div className="searchUserStyle">
        <label>
          First Name:
          <input
            type="text"
            className="inputSearchUser"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button onClick={handleSearch} className="btnSearch">
          Search
        </button>
      </div>
      {error && <p>{error}</p>}
      {userData && (
        <div className="searchUserStyle">
          <h2>Usuario Encontrado:</h2>
          <ProductCard
            className="usersCardDesign"
            id={userData.id}
            firstName={`Nombre: ${userData.firstName}`}
            lastName={`Apellido: ${userData.lastName}`}
            email={`Email: ${userData.email}`}
            address={`Dirección: ${userData.address}`}
            phoneNumber={`Teléfono: ${userData.phoneNumber}`}
            document={`DNI / NIE: ${userData.document}`}
            dateOfBirth={`Fecha de nacimiento: ${userData.dateOfBirth}`}
            token={token}
          />
        </div>
      )}
    </div>
  );
};
