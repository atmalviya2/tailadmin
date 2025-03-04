import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();
  const token = Cookies.get("token");
  if (!user || !token) {
    const returnTo = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/signin?returnTo=${returnTo}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 