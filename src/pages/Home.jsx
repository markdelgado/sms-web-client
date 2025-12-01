import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/mockApi"; 
// TODO: replace with fetchProducts from apiClient.js when backend is ready

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const perks = [
    { title: "Free In‑Store Pickup", detail: "Ready in 2 hours at any of our location." },
    { title: "365-Day Support", detail: "Chat, text, or visit us anytime you need help." },
  ];

  useEffect(() => {
    getProducts().then((data) => {
      setFeatured(data.slice(0, 3));
    });
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.35) 60%), url('/images/hero.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "580px",
          display: "flex",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <Badge bg="light" text="dark" className="mb-3 px-3 py-2 rounded-pill">
                New Arrivals Dropping Weekly
              </Badge>
              <h1 className="fw-bold display-5">Apperal for every day, curated by SMS</h1>
              <p className="lead">
                Discover store-exclusive appearel and online-only drops with seamless pickup or delivery.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/products" variant="light" size="lg">
                  Shop New Releases
                </Button>
                <Button as={Link} to="/cart" variant="outline-light" size="lg">
                  View Cart
                </Button>
              </div>
             
        
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1">Featured Products</h2>
            <p className="text-muted mb-0">Top sellers of the week</p>
          </div>
          <Button as={Link} to="/products" variant="outline-dark">
            Browse full collection
          </Button>
        </div>
        <Row>
          {featured.map((product) => (
            <Col key={product.sku} xs={12} md={4} className="mb-4">
              <Card className="h-100 border-0 shadow">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    height: "260px",
                    objectFit: "contain",
                    padding: "0.75rem",
                    backgroundColor: "#f8f9fa",
                  }}
                />
                <Card.Body>
                  <Card.Title className="mb-2">{product.title}</Card.Title>
                  <Card.Text className="fw-bold mb-3">${product.price}</Card.Text>
                  <Button as={Link}
                    to={`/products/${product.sku}`}
                   variant="dark">
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
};

export default Home;
