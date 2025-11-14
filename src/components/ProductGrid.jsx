import { Container, Row, Col } from "react-bootstrap";  
import ProductCard from "./ProductCard.jsx";

const ProductGrid = ({ products }) => {
  return (
    <Container className="py-4">
        <Row>
            {products.map((product) => (    
                <Col key={product.sku} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    </Container>
  );
};

export default ProductGrid;