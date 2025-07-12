import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logoFed from "../../assets/logoFed.png";

function Header() {
  const navigate = useNavigate();
  const {user, authorized, isLoading, logout } = useAuth(); 
 
  if (isLoading) return <div>Cargando...</div>;

  return (
    <Navbar expand="lg" className="bg-light justify-content-evenly">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            src={logoFed}
            alt="Logo"
            width="120"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5 me-auto">
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item href="#productos1">
                Productos-1
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#productos2">
                Productos-2
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#productos3">
                Productos-3
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex">
          <Nav>
            {authorized? (
              <>
                <Nav.Link as={Link} to="/admin" className="text-align-center">
                  <i className="bi bi-cart3 fs-4 mx-2"></i>{" "}
                  {/* Ícono de carrito */}
                </Nav.Link>
                <NavDropdown
                  title={<i className="bi bi-person-circle fs-4"></i>} // Icono de usuario
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item> <strong>Hola {user?.name || "Usuario"}</strong></NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#carrito">Carrito</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  onClick={logout}>
                    {" "}
                    <div className="d-flex align-items-center text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar sesión
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div>
                <Button as={Link} to="/login" variant="dark" className="m-1">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Button>
                <Button as={Link} to="/register" variant="dark" className="m-1">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Registrarse
                </Button>
              </div>
            )}
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
