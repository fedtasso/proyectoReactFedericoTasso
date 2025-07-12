import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white mt-auto py-2">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <i className="bi bi-cart3 fs-4 text-primary me-2"></i>
                <span className="fs-5 fw-bold">Carrito de Compras</span>
              </div>
              <p className="mt-2 small">Tu tienda online favorita</p>
            </Col>

            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="d-flex justify-content-center gap-3 mb-2">
                <a href="#" className="text-white" title="Instagram">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" className="text-white" title="Contacto">
                  <i className="bi bi-envelope fs-5"></i>
                </a>
                <a href="#" className="text-white" title="Contacto">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
              </div>
              <p className="small mb-0">Nuestras redes</p>
            </Col>

            <Col md={4} className="text-center text-md-end">
              <p className="small mb-0">Copyright © 2025 Federico Tasso</p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <a
                href="#"
                className="text-white mx-2 small"
                title="Términos y Condiciones"
              >
                <i className="bi bi-file-text fs-6 me-1"></i>
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="text-white mx-3 small"
                title="Política de Privacidad"
              >
                <i className="bi bi-shield-lock fs-6 me-1"></i>
                Política de Privacidad
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
