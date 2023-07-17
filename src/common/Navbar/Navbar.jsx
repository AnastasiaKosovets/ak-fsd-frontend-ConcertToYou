import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if ( scrollTop > 0){
            setIsSticky(true);
            const opacity = 1 - (scrollTop / window.innerHeight) * 0.2;
            setScrollOpacity(opacity);
        } else {
            setIsSticky(false);
            setScrollOpacity(1);
        }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${isSticky ? "sticky" : ""}`} style={{ opacity: scrollOpacity }}>
      <nav>
      <div className="offCanvasStyle">
        <Button
          onClick={handleShow}
          className="buttonOffCanvasStyle"
          style={{ backgroundColor: "black" }}
        >
          <div className="canvasText">Descubrenós</div>
        </Button>
        <Offcanvas show={show} onHide={handleClose} className="test">
          <Offcanvas.Header closeButton className="canvasBody">
            <Offcanvas.Title className="canvasText">ConcertToYou</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="canvasBody">
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
       
      </div>
      </nav>
    </header>
  );
}

export default Header;
