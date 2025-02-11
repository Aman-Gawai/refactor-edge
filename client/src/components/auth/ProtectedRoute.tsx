import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'student' | 'teacher' | 'admin';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
