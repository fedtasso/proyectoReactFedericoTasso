import { useCart } from "../../hooks/useCart";
import { Button, Card, ListGroup, Image, Row, Col } from "react-bootstrap";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from "../../components/LoadingSpinner";

const Cart = () => {
  const { cart, isLoadingCart, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Card className="mt-4">
        <Card.Body className="text-center">
          <FaShoppingCart size={48} className="mb-3 text-muted" />
          <h5>Tu carrito está vacío</h5>
          <p>Agrega productos para comenzar</p>
        </Card.Body>
      </Card>
    );
  }

  if (isLoadingCart ) {
      return (
        <LoadingSpinner text="Cargando carrito..."/>
      );
    }

  return (
    <Card className="mt-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Carrito de Compras</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="py-3">
              <Row className="align-items-center">
                {/* Columna de la imagen */}
                <Col xs={3} md={2}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fluid
                    thumbnail
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </Col>

                {/* Columna del título */}
                <Col xs={4} md={5}>
                  <h6 className="mb-1">{item.title}</h6>
                  <small className="text-muted">{item.category}</small>
                </Col>

                {/* Columna del precio */}
                <Col xs={2} className="text-end">
                  <span className="fw-bold">${item.price}</span>
                </Col>

                {/* Columna de cantidad */}
                <Col xs={2}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    min="1"
                    className="form-control form-control-sm mx-1 text-center"
                    style={{ width: "50px" }}
                  />
                </Col>

                {/* Columna de eliminar */}
                <Col xs={1} className="text-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    title="Eliminar"
                    className="p-1"
                  >
                    <FaTimes />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Total y botón de compra */}
        <div className="mt-4 border-top pt-3">
          <Row className="justify-content-end">
            <Col xs={12} md={4}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h4 className="mb-0 text-primary">
                  ${calculateTotal().toFixed(2)}
                </h4>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={() => navigate('/checkout')}
                disabled={cart.length === 0}
              >
                Finalizar Compra
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cart;
