import React from "react";
import "./Footer.css";
import github from "../../../img/github.png";
import linkedin from "../../../img/linkedin.png";

export const Footer = () => {
  return (
    <div className="footerStyle" style={{ fontFamily: "Great Vibes" }}>
      <div>
        <p className="txtFooter">© Anastasia Kosovets </p>
      </div>
      <div>
        <p>
          <a
            href={"https://github.com/AnastasiaKosovets"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github link" className="iconFooter"/>
          </a>
        </p>
      </div>
      <div>
        <p>
          <a
            href={"https://www.linkedin.com/in/anastasia-kosovets-00022917b/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="github link" className="iconFooter" />
          </a>
        </p>
      </div>
      <div className="txtFooter">
        <p>Aviso legal</p>
        <p>Política de privacidad</p>
      </div>
    </div>
  );
};
