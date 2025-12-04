import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { submitSale } from "../api/mockApi";

import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("CREDIT");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // calc total based on selected cart quantities
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);

  // Submit order
  const placeOrder = async () => {
    const requiredFields = ["fullName", "email", "address", "city", "state", "zip"];
    const missing = requiredFields.filter((field) => !form[field]?.trim());
    if (missing.length > 0) {
      setError("Please fill out all shipping information before placing your order.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const cartItems = cart.flatMap((item) => {
      const quantity = Math.max(item.quantity ?? 1, 1);
      return Array.from({ length: quantity }, () => ({
        sku: item.sku,
        price: item.price,
      }));
    });

    try {
      const { saleId } = await submitSale(cartItems, paymentMethod);

      if (saleId) {
        clearCart();
        navigate(`/order-confirmation?orderId=${saleId}`);
      } else {
        setError("Unable to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to place order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>Your cart is empty</h3>
        <Button href="/products" variant="primary">Shop Products</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={7}>
          <h3>Shipping Information</h3>

          <Form className="mt-4">
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main Street"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="12345"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="CREDIT">Credit Card</option>
                <option value="CASH">Cash</option>
                <option value="APPLE_PAY">Apple Pay</option>
                <option value="PAYPAL">PayPal</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Col>

        {/* ORDER SUMMARY */}
        <Col md={5}>
          <Card className="p-3 shadow-sm">
            <h4>Order Summary</h4>
            <hr />

            {cart.map((item) => {
              const quantity = item.quantity ?? 1;
              return (
                <div key={item.sku} className="d-flex justify-content-between mb-2">
                  <div>{item.name} (x{quantity})</div>
                  <div>${(item.price * quantity).toFixed(2)}</div>
                </div>
              );
            })}

            <hr />
            <h5>Total: ${total.toFixed(2)}</h5>

            <Button
              variant="success"
              className="w-100 mt-3"
              size="lg"
              onClick={placeOrder}
            >
              Place Order
            </Button>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
