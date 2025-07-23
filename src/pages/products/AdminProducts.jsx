import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Container, Alert } from "react-bootstrap";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/AdminProductsService";
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { toast } from "react-toastify";


export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error('Solo los administradores pueden modificar o agregar productos');
      setShowModal(false);
      return;
    }

    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowModal(false);
      fetchProducts();
      resetForm();
    } catch (err) {
      setError("Error al guardar el producto");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
     if (!isAdmin) {
      toast.error('Solo los administradores pueden borrar productos');
      setShowModal(false);
      return;
    }
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError("Error al eliminar el producto");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
    });
    setCurrentProduct(null);
  };

  if (loading) {
    return <LoadingSpinner text="Cargando información..." />;
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Administrar Productos</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Agregar Producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th className="d-none d-md-block">Descripción</th>
            <th>imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="d-none d-md-block">{product.description}</td>
              <td>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetForm();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? "Editar Producto" : "Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la imagen</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
