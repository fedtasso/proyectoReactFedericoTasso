import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import ProductCard from '../components/Card/ProductCard';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { API_URL_PRODUCTS } from '../config/constants';

const API_URL = API_URL_PRODUCTS;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
        // Inicialmente mostrar todos los productos
        setFilteredProducts(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  if (loading) {
    return <LoadingSpinner text="Cargando productos..." />;
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="mb-3 mb-md-0">Productos Disponibles</h2>
        
        {/* Campo de búsqueda */}
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Alert variant="info" className="text-center">
              {searchTerm 
                ? `No se encontraron productos para "${searchTerm}"`
                : 'No hay productos disponibles'}
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;