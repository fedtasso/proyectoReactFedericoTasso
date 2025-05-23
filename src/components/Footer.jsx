import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <Container className='text-center'>
        {/* <div className=''>LOGO</div> TO DO agregar logo a izquierda y cambiar inline-block*/}
        <div>
          <p className="mb-0">Carrito de compras</p>
          <div className="mt-2">
            <a href="#" className="text-white mx-2">Instagram</a>
            <a href="#" className="text-white mx-2">Contacto</a>
            <a href="#" className="text-white mx-2">Términos</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}