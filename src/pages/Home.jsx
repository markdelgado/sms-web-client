import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/mockApi"; 
// TODO: replace with fetchProducts from apiClient.js when backend is ready

const Home = () => {
  const [featured, setFeatured] = useState([]);

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
          backgroundImage: "url('/images/hero.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "540px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "0px 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        <div className="text-center">
          <h1 className="fw-bold">Welcome to SMS Store</h1>
          <p>Your favorite products — available in-store & online.</p>

          <Button as={Link} to="/products" variant="light" size="lg">
            Shop Now
          </Button>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <Row>
          {featured.map((product) => (
            <Col key={product.sku} xs={12} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "fit", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>

                  <Button
                    as={Link}
                    to="/products"
                    variant="primary"
                  >
                    View Products
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
