import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, changeQuantity, removeFromCart, clearCart } = useContext(CartContext);


  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 0), 0);
  const increaseQty = (product) => {
    changeQuantity(product.sku, 1);
  };
  const decreaseQty = (product) => {
    if ((product.quantity ?? 0) <= 1) {
      removeFromCart(product.sku);
      return;
    }
    changeQuantity(product.sku, -1);
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your cart is empty</h3>
        <Button as={Link} to="/products" variant="primary" className="mt-3">
          Shop Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.map((item) => (
        <Card key={item.sku} className="mb-3 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">

              {/* Product Image */}
              <Col md={2} xs={4}>
                <Image
                  src={item.image}
                  fluid
                  rounded
                  style={{ height: "80px", objectFit: "cover" }}
                />
              </Col>

              {/* Product Name */}
              <Col md={3} xs={8}>
                <h5 className="mb-1">{item.name}</h5>
                <small className="text-muted">SKU: {item.sku}</small>
              </Col>

              {/* Price */}
              <Col md={2} className="text-start mt-3 mt-md-0">
                <strong>${item.price}</strong>
              </Col>

              {/* Quantity Controls */}
              <Col md={3} className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => decreaseQty(item)}
                >
                  –
                </Button>

                <span>{item.quantity ?? 0}</span>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => increaseQty(item)}
                >
                  +
                </Button>
              </Col>

              {/* Remove Button */}
              <Col md={2} className="text-end mt-3 mt-md-0">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.sku)}
                >
                  Remove
                </Button>
              </Col>

            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Total Price + Checkout */}
      <Card className="p-3 mt-4 shadow-sm">
        <h4>Total: ${total.toFixed(2)}</h4>

        <div className="d-flex gap-3 mt-3">
          <Button as={Link} to="/checkout" variant="success">
            Proceed to Checkout
          </Button>

          <Button variant="outline-danger" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Cart;
