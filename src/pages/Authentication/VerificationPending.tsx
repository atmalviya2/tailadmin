import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/button';

const VerificationPending = () => {
  const { resendVerification, isResending } = useAuth();
  const [email] = useState(() => sessionStorage.getItem('pendingVerificationEmail') || '');

  const handleResend = () => {
    if (email) {
      resendVerification(email);
    }
  };

  return (
    <AuthLayout title="Verify Your Email">
      <div className="mb-6">
        <p className="text-black dark:text-white">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          If you don't see the email, please check your spam folder or click below to resend.
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-4">
        <Button
          onClick={handleResend}
          disabled={isResending || !email}
          className="text-white"
        >
          {isResending ? 'Resending...' : 'Resend Verification Email'}
        </Button>
        <Link to="/auth/signin" className="text-primary">
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default VerificationPending; 