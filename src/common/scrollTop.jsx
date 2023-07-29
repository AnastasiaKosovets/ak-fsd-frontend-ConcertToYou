import { useEffect, useState } from "react";
import up from "../../img/up.png";

export const ScrollTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if(showScrollButton){
    return(
      <button className="scrollButton bg-transparent" onClick={scrollTop}>
        <img src={up} alt="boton hacia arriba" className="up" style={{ width: '3rem', height: '3rem', marginBottom: '-2em', marginRight: '-7em' }}/>
      </button>
    )
  }
};