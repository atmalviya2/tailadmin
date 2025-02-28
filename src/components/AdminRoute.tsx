import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = (Component: React.ComponentType) => () => {
  const { user } = useUser();
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default AdminRoute; 