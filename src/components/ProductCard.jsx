import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ objectFit: "contain", height: "220px", padding: "0.75rem" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <div className="text-end fw-semibold">${product.price}</div>
        <div className="d-flex flex-column gap-2 mt-auto">
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to={`/products/${product.sku}`}
              variant="outline-dark"
              className="flex-fill"
            >
              View
            </Button>
            <Button
              variant="dark"
              onClick={() => addToCart(product, 1)}
              className="flex-fill"
            >
              Add
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
