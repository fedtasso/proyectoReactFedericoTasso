import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/user/UserProfile";
import Cart from "./pages/cart/Cart";
import { AdminProducts } from "./pages/products/AdminProducts";
import { Checkout } from "./pages/checkout";

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <>
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </>
            <Header />
            <main className="flex-grow-1 mt-5">
              <Container className="py-4 mt-1">
                <Routes>
                  {/* Rutas publicas */}
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  {/* rutas protegidas */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                  </Route>
                </Routes>
              </Container>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
