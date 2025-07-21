import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

// Clave para localStorage
const CART_STORAGE = "shopping_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  //  {
  //     id: "1",
  //     title: "Fjallraven - Foldsack No. 1 Backpack...",
  //     price: 109.95,
  //     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     quantity: 2
  //   }

  //----------------------------------------------//
  // Cargar carrito desde localStorage al iniciar
  //----------------------------------------------//
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem(CART_STORAGE);
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();
  }, []);

  //----------------------------------------------//
  // guardar carrito en localStorage en cada cambio
  //----------------------------------------------//
  useEffect(() => {
    if(!isLoadingCart)
    localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
  }, [cart]);

  //----------------------------------------------//
  // CRUD carrito
  //----------------------------------------------//
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      // si existe sumar sino agregar
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newValue) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== itemId) return item;

          let quantity = Math.max(1, parseInt(newValue) || 1);

          // quantity = Math.min(quantity, item.maxStock || 999);

          return { ...item, quantity };
        })
        .filter((item) => item !== null)
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    localStorage.removeItem(CART_STORAGE);
    setCart([]);
  };

  const totalItems = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoadingCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        getItemQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
