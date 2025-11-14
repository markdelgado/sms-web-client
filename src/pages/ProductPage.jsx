import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getProductBySku } from "../api/mockApi";
// REPLACE with fetchProductBySku from apiClient.js when backend is ready
import { CartContext } from "../contexts/CartContext.jsx";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const ProductPage = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductBySku(sku).then((data) => setProduct(data));
  }, [sku]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <Button variant="dark" onClick={() => addToCart(product, 1)}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;