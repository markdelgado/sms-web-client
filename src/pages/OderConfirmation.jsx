import { Container, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const OrderCOnfirmation = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const orderId = params.get("orderId");
    return (
        <Container className="py-4 text-center">
            <h2>Thank you for your order!</h2>
            {orderId && (
                <p className="mt-3">
                    Your order ID is <strong>{orderId}</strong>
                </p>
            )}
            <Button as={Link} to="/products" variant="primary" className="mt-4">
                Continue Shopping
            </Button>
        </Container>
    );
}
export default OrderCOnfirmation;