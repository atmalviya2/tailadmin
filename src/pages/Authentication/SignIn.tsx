import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../layout/AuthLayout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const { login, isLoggingIn } = useAuth();
  
  const form = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <AuthLayout title="Sign In to Dashboard">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold text-black">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="flex justify-between mt-2 text-sm font-semibold">
            <p className="w-fit ml-2">
              Don't have an account?
            </p>
            <Link to="/auth/signup" className="text-primary mr-4">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignIn;
