import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom'; 

function Header() {
  const navigate = useNavigate();
  const { authFetch } = useAuth(); // Solo necesitamos authFetch
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado local de carga

  useEffect(() => {
    const verifyAuthAndLoadData = async () => {
      try {
        setIsLoading(true);
        // const { response, data } = await authFetch('/api/user/profile');  TO DO implementar en back
        
        //simular respuesta
        const response = {
          status: 401
        }       
        const data = {
          name: "Fede Tasso"
        }

        if (response.status === 401) { // No autenticado
          navigate('/login', { replace: true });
          return;
        }
        
        // Autenticado y datos válidos
        setUserData(data); 
        
      } catch (error) {
        console.error('Error:', error);
        // Opcional: mostrar mensaje de error al usuario
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthAndLoadData();
  }, [authFetch, navigate]);

  
  if (isLoading) return <div>Cargando...</div>;

  return (
    <Navbar expand="lg" className="bg-light justify-content-evenly"> {/* Corregido bg-ligth */}
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-5 me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Productos" id="basic-nav-dropdown">
              <NavDropdown.Item href="#productos1">Productos-1</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#productos2">Productos-2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#productos3">Productos-3</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className='d-flex'>
          
          <Nav>
  {userData ? (
    <>
      <Nav.Link as={Link} to="/perfil/usuario123">Perfil</Nav.Link>
      <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
      <NavDropdown 
        title={<i className="bi bi-person-circle fs-4"></i>}  // Icono de usuario
        id="user-dropdown"
        align="end"
      >
        <NavDropdown.Item href="#usuario1">Mi perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#usuario2">Configuración</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>  {/* Cerrar sesión */}
          <div className="d-flex align-items-center text-danger">
            <i className="bi bi-box-arrow-right me-2"></i>
            Cerrar sesión
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  ) : (
    <Button variant="dark">
      <i className="bi bi-box-arrow-in-right me-2"></i>
      Login
    </Button>
  )}
</Nav>
        </div>
      </Container>
    </Navbar>
  );
}
  
export default Header;