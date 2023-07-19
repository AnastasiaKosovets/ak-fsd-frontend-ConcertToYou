import { useEffect, useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { userData }  from "../../pages/userSlice";

export const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  const user = useSelector(userData);
  const role = user.role_id;
  const dispatch = useDispatch();

  
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
    className={`navbar ${isSticky ? "sticky" : ""} ${
      show ? "offcanvas-visible" : ""
    }`}
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
            <Nav.Link as={Link} to="#" className="headerText mb-3" onClick={handleClose}>
              Conciertos
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="headerText mb-3" onClick={handleClose}>
              MusicToYou
            </Nav.Link>
            <Nav.Link as={Link} to="#" className="headerText mb-3" onClick={handleClose}>
              Sobre Nosotros
            </Nav.Link>
            {role === 3 && (
              <Nav.Link as={Link} to="/profile" className="headerText mb-3" onClick={handleClose}>
                Perfil
              </Nav.Link>
            )}
            {role !== 3 && (
              <Nav.Link as={Link} to="/login" className="headerText" onClick={handleClose}>
                Login
              </Nav.Link>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </nav>
    </header>
  );
}

// export default Header;
