import { useMutation } from '@tanstack/react-query';
import { authService, RegisterData, LoginData } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      console.log('Registration successful!');
      toast.success('Registration successful! Please check your email.');
      navigate('/auth/verification-pending');
    },
    onError: (error: any) => {
      console.log('error in useAuth', error);
      if (error?.response?.data?.includes('duplicate')) {
        toast.error('Email already exists');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      toast.success('Email verified successfully!');
      navigate('/auth/signin');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Verification failed';
      toast.error(errorMessage);
      navigate('/auth/signup');
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: (email: string) => authService.resendVerification(email),
    onSuccess: () => {
      toast.success('Verification email resent successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to resend verification email';
      toast.error(errorMessage);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.user);
      toast.success('Logged in successfully!');
      navigate('/');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    },
  });

  return {
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    verifyEmail: verifyEmailMutation.mutate,
    isVerifying: verifyEmailMutation.isPending,
    resendVerification: resendVerificationMutation.mutate,
    isResending: resendVerificationMutation.isPending,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}; 