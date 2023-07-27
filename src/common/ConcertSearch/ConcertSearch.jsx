import React, { useState } from "react";
import "./ConcertSearch.css";
import { searchConcerts } from "../../services/apiCalls";

export const ConcertSearch = ({ onConcertsFetched }) => {
  const [groupName, setGroupName] = useState("");
  const [title, setTitle] = useState("");

  const handleSearchConcert = async () => {
    try {
      const concerts = await searchConcerts(groupName, title);
      onConcertsFetched(concerts);
    } catch (error) {
      console.log("error al buscar conciertos:", error);
    }
  };

  return (
    <div className="searchConcertStyle">
      <input
      className="inputConcertSearch"
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Nombre del grupo"
      />
      <input
      className="inputConcertSearch"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <button className="btnSearchConcert" onClick={handleSearchConcert}>Buscar</button>
    </div>
  );
};
