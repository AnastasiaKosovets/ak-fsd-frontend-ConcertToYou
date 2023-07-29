import React, { useEffect, useState } from "react";
import "./Groups.css";
import { Col, Container, Row } from "react-bootstrap";
import { ScrollTopButton } from "../../common/scrollTop";
// import spInner from "../../../img/spInner.gif";
import { getGroups } from "../../services/apiCalls";
import { GroupsCard } from "../../common/GroupsCard/GroupsCard";

export const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  //   this part take dates from backend of groups and update the state
  useEffect(() => {
    getGroups()
      .then((res) => {
        setGroups(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error getting groups:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="generalConcertView">
      
    </div>
  );
};
