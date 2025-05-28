import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100"> 
        <Header />
        <main className="flex-grow-1"> 
          <Container className="py-4"> 
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
