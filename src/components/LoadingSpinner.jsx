import { Container, Spinner } from "react-bootstrap";

export const LoadingSpinner = ({ text = "Cargando..." }) => {
  return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem',  borderWidth: '0.4rem' }}/>
      <p className="mt-2">{text}</p>
    </Container>
  );
};
