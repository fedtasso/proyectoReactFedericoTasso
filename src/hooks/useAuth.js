import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuth: null,   
    isLoading: false 
  });


  // Función para autenticar
  const authFetch = async (url, options = {}) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // TO DO agregar setTimeOut para mostrar modal

      // hacer peticion a api externa
      const response = await fetch(url, {
        ...options,
        credentials: 'include'
      });

      // no autenticado
      if (response.status === 401) {
        setAuthState({
          isAuth: false,
          isLoading: false
        });
        return { response, data: null };
      }

      const data = await response.json();
      
      // acceso permitido
      setAuthState({
        isAuth: true,
        isLoading: false
      });

      return { response, data };
    } catch (error) {
      setAuthState({
        isAuth: false,
        isLoading: false
      });
      throw error;
    }
  };

  // Login de usuario
  const login = async (credentials) => {
    const { response } = await authFetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      navigate('/dashboard');
    }
  };

  const logout = async () => {
    await authFetch('/api/auth/logout', { method: 'POST' });
    navigate('/login');
  };

  return {
    ...authState,
    authFetch,
    login,
    logout
  };
}