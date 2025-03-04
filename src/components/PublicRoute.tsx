import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Cookies from 'js-cookie';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const location = useLocation();
  const token = Cookies.get("token");
  
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/';

  if (user && token) {
    return <Navigate to={returnTo} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute; 