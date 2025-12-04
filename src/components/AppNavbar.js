import { Navbar, Nav, Container, Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext.jsx";
import { useContext } from "react";

const AppNavbar = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + (item.quantity ?? 1), 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <Image
            src="/logo67.svg"
            alt="67 Clothing logo"
            height={32}
            width={32}
          />
          <span className="fw-semibold">67 Apparel</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {/* Products Link */}
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* Cart Link with Item Count */}
            <Nav.Link as={Link} to="/cart">
              Cart{" "}
              {cartCount > 0 && <Badge bg="secondary">{cartCount}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
