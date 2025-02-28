import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute; 