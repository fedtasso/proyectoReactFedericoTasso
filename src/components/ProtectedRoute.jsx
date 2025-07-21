import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

export default function ProtectedRoute() {
  const { authorized, isLoading } = useAuth();

  // Estado inicial - esperando verificación
  if (authorized === null || isLoading) {
    return <LoadingSpinner text="Verificando..."/>;
  }

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
}
