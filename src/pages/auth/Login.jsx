import { useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from "react-router-dom";
import styles from './Login.module.css';
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [passwordChecks, setPasswordChecks] = useState({
    hasLength: false,
    hasNumber: false,
    hasUppercase: false,
  });
  const [showAlert, setShowAlert] = useState(true);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  //manejar envio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    //validar email
    if (!emailRegex.test(credentials.email)) {
      setError("Email inválido");
      return;
    }
    
    //validar password
    if (!Object.values(passwordChecks).every(Boolean)) {
      setError("La contraseña no cumple todos los requisitos");
      return;
    }
    
    //verificar datos en DB
    try {
      const result = await login(credentials);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  // manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "email" ? value.trim().toLowerCase() : value.trim();

    setCredentials((prev) => ({ ...prev, [name]: processedValue }));

    // Lógica específica para el campo de contraseña
    if (name === "password") {
      setPasswordChecks({
        hasLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasUppercase: /[A-Z]/.test(value),
      });
    }

    //validar email luego del error
    if (emailRegex.test(credentials.email)) {
      setError("");
      return;
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center"><strong>Login</strong></Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <div className="mt-2">
                <small>La contraseña debe contener:</small>
                <ul className="list-unstyled">
                  <li
                    className={
                      passwordChecks.hasLength ? "text-success" : "text-muted"
                    }
                  >
                    {passwordChecks.hasLength ? "✓" : "•"} Mínimo 8 caracteres
                  </li>
                  <li
                    className={
                      passwordChecks.hasNumber ? "text-success" : "text-muted"
                    }
                  >
                    {passwordChecks.hasNumber ? "✓" : "•"} Al menos 1 número
                  </li>
                  <li
                    className={
                      passwordChecks.hasUppercase
                        ? "text-success"
                        : "text-muted"
                    }
                  >
                    {passwordChecks.hasUppercase ? "✓" : "•"} Al menos 1
                    mayúscula
                  </li>
                </ul>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Cargando...</span>
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
            <p className="m-3 text-center">Si no tenés cuenta {''}
              <Link  to="/register" className={styles.linkHoverUnderline} >registrate acá</Link></p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
