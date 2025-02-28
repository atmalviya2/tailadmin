import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../layout/AuthLayout';

const VerifyEmail = () => {
  const { token } = useParams();
  const { verifyEmail, isVerifying } = useAuth();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <AuthLayout title="Email Verification">
      {isVerifying && (
        <div className="text-center">
          <div className="mb-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Verifying your email...</h3>
          <p className="text-gray-500">Please wait while we verify your email address.</p>
        </div>
      )}
    </AuthLayout>
  );
};

export default VerifyEmail;