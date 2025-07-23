import { Card, Button} from "react-bootstrap";
import { useCart } from "../../hooks/useCart";
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { authorized } = useAuth();

  const handleAddToCart = () => {
  if (!authorized) {
    toast.warn('Debes iniciar sesión para comprar', {
      icon: <i className="bi bi-exclamation-triangle-fill text-warning"></i>,
    });
    return;
  }

  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
  });

  toast.success('Producto agregado al carrito', {
    icon: <i className="bi bi-cart-check-fill text-success"></i>,
  });
};

  return (
    <Card className="h-100 shadow-sm position-relative">

      <Card.Img
        variant="top"
        src={product.image || "/placeholder-image.jpg"}
        alt={product.title}
        className="p-3 bg-light"
        style={{
          height: "200px",
          objectFit: "contain",
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6" style={{ minHeight: "48px" }}>
          {product.title}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted text-capitalize">
          {product.category}
        </Card.Subtitle>

        <div className="mt-auto">
          <Card.Text className="fw-bold fs-5 mb-3">
            ${Number(product.price).toFixed(2)}
          </Card.Text>

          <Button
            variant="primary"
            size="sm"
            className="w-100"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Añadir al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
