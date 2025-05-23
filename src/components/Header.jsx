import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar expand="lg" className="bg-ligth justify-content-evenly">
      <Container>
        <Navbar.Brand href="#home">Carrito</Navbar.Brand>
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
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="#link">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div>Usuario</div>
      </Container>
    </Navbar>
  );
}

export default Header;