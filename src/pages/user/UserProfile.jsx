import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, deleteUser, updateUser } = useAuth();
  const [passwordChecks, setPasswordChecks] = useState({
    hasLength: false,
    hasNumber: false,
    hasUppercase: false,
  });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Datos del usuario
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    repeatPassword: "",
  });

  //actualizar usuario cuando haya cambios
  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    //Borrar espacios en email
    const processedValue =
      name === "email" ? value.trim().toLowerCase() : value.trim();

    setUserData((prev) => ({ ...prev, [name]: processedValue }));

    // Lógica específica para el campo de contraseña
    if (name === "password") {
      setPasswordChecks({
        hasLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasUppercase: /[A-Z]/.test(value),
      });
    }
  };

  // Manejar envio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //validar email
    if (!emailRegex.test(userData.email)) {
      setError("Email inválido");
      return;
    }

    //validar password
    if (userData.password && !Object.values(passwordChecks).every(Boolean)) {
      setError("La contraseña no cumple todos los requisitos");
      return;
    }

    try {
      // Validación de contraseñas
      if (userData.password && userData.password !== userData.repeatPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      setIsLoading(true);

      // Actualizar datos
      await updateUser({
        id: user.id,
        name: userData.name,
        email: userData.email,
        ...(userData.password && { password: userData.password }),
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Eliminar usuario
      await deleteUser();
      navigate("/login");
    } catch (err) {
      setError("Error al eliminar la cuenta");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      {/* Modal de éxito (actualización) */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Datos actualizados!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tus datos se han guardado correctamente.</p>
          <p>Nombre: {user?.name || ""}</p>
          <p>Email: {user?.email || ""}</p>
          {userData.password ? <p>Contraseña actualizada</p> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación (eliminación) */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Eliminar cuenta?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta acción no se puede deshacer. ¿Estás seguro?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <Spinner as="span" size="sm" animation="border" />
            ) : (
              "Eliminar definitivamente"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tarjeta de perfil */}
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            <strong>Mi Perfil</strong>
          </Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
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

            <Form.Group className="mb-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="repeatPassword"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner as="span" size="sm" animation="border" />
                ) : (
                  "Guardar Cambios"
                )}
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Eliminar Cuenta
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
