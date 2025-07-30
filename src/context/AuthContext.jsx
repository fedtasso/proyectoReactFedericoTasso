import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL_USERS } from "../config/constants";

export const AuthContext = createContext();
const API_URL = API_URL_USERS;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // -------------------------------------------------------------------//
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      //obtener todos los usuarios
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en la petición");
      const data = await response.json();

      //filtrar usuario por email
      const userData = data.find(
        (user) => user.email === credentials.email.trim().toLowerCase()
      );

      //verificar usuario y contraseña
      if (!userData) throw new Error("Usuario no encontrado");
      if (userData.password !== credentials.password)
        throw new Error("Contraseña incorrecta");

      //borrar password de objeto userData
      const { password, ...safeUser } = userData;

      //verificar si es administrador
      if (userData.email === "admin@mail.com") {
        setIsAdmin(true);
      }

      // dar permisos
      setUser(safeUser);
      setAuthorized(true);
      localStorage.setItem("user", JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    } catch (error) {
      // borrar usuario y autorizaciones
      setUser(null);
      setAuthorized(false);
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------------//
  const logout = () => {
    setUser(null);
    setAuthorized(false);
    setIsAdmin(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // -------------------------------------------------------------------//
  const clearSession = () => {
    // Solo limpia la sesión sin redirigir
    setUser(null);
    setAuthorized(false);
    setIsAdmin(false);
    localStorage.removeItem("user");
  };

  // -------------------------------------------------------------------//
  const register = async (credentials) => {
    try {
      //verificar si usuario existe
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en la petición");
      const data = await response.json();

      //verificar usuario por email
      const userExists = data.find(
        (user) => user.email === credentials.email.trim().toLowerCase()
      );
      if (userExists) throw new Error("El email ya se encuentra registrado");

      // datos de usuario nuevo
      const newUser = {
        name: credentials.name.trim(),
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password.trim(),
      };

      //crear usuario en db
      const postResponse = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      //verificar respuesta
      if (!postResponse.ok)
        throw new Error("Error al crear el usuario, intente nuevamente");

      return { success: true, user: response.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // -------------------------------------------------------------------//
  const checkAuth = async () => {
    try {
      //recuperar datos local de usuario
      const credentials = localStorage.getItem("user");
      if (!credentials) {
        clearSession();
        return;
      }
      const localUserData = JSON.parse(credentials);

      //buscar usuario en DB
      const response = await fetch(`${API_URL}/${localUserData.id}`);
      if (!response.ok) {
        clearSession();
        throw new Error("Error al validar usuario");
      }
      const dbUserData = await response.json();

      //verificar token
      if (dbUserData.token !== localUserData.token) {
        clearSession();
        throw new Error("Token no válido");
      }

      setAuthorized(true);
      setUser(localUserData);
    } catch (error) {
      clearSession();
      toast.warm("Debes iniciar sesión nuevamente");
      console.error("Error al validar sesión:");
    }
  };

  // validar sesión en cada cambio de página
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsLoading(true);
        await checkAuth();
      } catch (error) {
        console.error("Error al validar sesión:");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  
  // -------------------------------------------------------------------//
  const updateUser = async (userFormData) => {
    try {
      // verificar si email existe
      const usersData = await fetch(API_URL);
      if (!usersData.ok) throw new Error("Error en la petición");
      const usersDataObject = await usersData.json();

      //verificar usuario por email
      const userExists = usersDataObject.find(
        (user) =>
          user.email === userFormData.email.trim().toLowerCase() &&
          user.id !== userFormData.id
      );

      if (userExists) throw new Error("El email ya se encuentra registrado");

      // actualizar usuario
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });

      // verificar respuesta
      if (!response.ok) {
        throw new Error("Error en la actualización");
      }
      // convertir respuesta
      const newUser = await response.json();

      // actualizar user y localstorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return { success: true, user: response.data };
    } catch (error) {
      throw error;
    }
  };

  //----------------------------------//
  //----------------------------------//
  const deleteUser = async () => {
    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");
      setUser(null);
      setAuthorized(false);
      localStorage.removeItem("user");

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authorized,
        isAdmin,
        login,
        logout,
        register,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
