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
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <Button
            as={Link}
            to={`/products/${product.sku}`}
            variant="dark">
             View
        </Button>
        <Button variant="dark" onClick={() => addToCart(product, 1)}>
          Add to Cart - ${product.price}
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
