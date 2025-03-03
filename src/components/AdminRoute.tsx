import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminRoute = (Component: React.ComponentType) => () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <Component />;
};

export default AdminRoute; 