import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Checkout = () => {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Limpiar el carrito cuando el componente se monta
  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner text="Procesando pago..." />;
  }

  return (
    <Container className="text-center mt-5 p-5">
      <h2 className="mb-4">Compra realizada con éxito</h2>
      <p className="lead mb-4">Gracias por tu compra</p>
      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate("/")}
        className="px-4" // Un poco más de padding horizontal
      >
        Volver al inicio
      </Button>
    </Container>
  );
};
