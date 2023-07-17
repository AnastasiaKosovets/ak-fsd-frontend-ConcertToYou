import { useEffect, useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      if (scrollTop > 0) {
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
    <header
      className={`navbar ${isSticky ? "sticky" : ""}`}
      style={{ opacity: scrollOpacity }}
    >
      <nav className="navbar-expand-lg navStyleb">
        <div className="container d-flex align-items-center">
          <Nav.Link
            as={Link}
            to="#"
            onClick={handleShow}
            className="headerText"
          >
            Descubrenos
          </Nav.Link>
          <Nav.Link as={Link} to="#" className="headerText d-none d-sm-block">
            Disfruta de la música
          </Nav.Link>
          <Nav.Link as={Link} to="#" className="headerText d-none d-sm-block">
            Sobre Nosotros
          </Nav.Link>
        </div>
        <Offcanvas show={show} onHide={handleClose} className="test">
          <Offcanvas.Header closeButton className="canvasBody">
            <Offcanvas.Title className="canvasTextTitle">
              ConcertToYou
              <hr className="canvasLine" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="canvasBody">
            <Nav.Link as={Link} to="#" className="headerText mb-3">
              Conciertos
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="headerText mb-3">
              MusicToYou
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="headerText mb-3">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="headerText">
              Login
            </Nav.Link>
          </Offcanvas.Body>
        </Offcanvas>
      </nav>
    </header>
  );
}

export default Header;
