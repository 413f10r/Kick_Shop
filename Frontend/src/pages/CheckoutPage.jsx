import CheckoutForm from "../components/CheckoutForm";
import OrderRecap from "../components/OrderRecap";
import { Container, Row, Col } from "react-bootstrap";

export default function CheckoutPage() {
    return (
        <Container fluid="md" className="py-4">
            <Row className="g-4">
                {/* Colonna Riepilogo + Metodi di pagamento */}
                <Col xs={12} lg={5}>
                    <div className="py-3">
                        <h1 className="category-title-riep py-3">Riepilogo ordine</h1>

                        <OrderRecap />

                        {/* <hr /> */}

                    </div>
                </Col>
                {/* Colonna Form */}
                <Col xs={12} lg={7}>
                    <CheckoutForm />
                </Col>

            </Row>
        </Container>
    );
}
