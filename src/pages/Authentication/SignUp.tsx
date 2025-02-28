// import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tootip";
import { Link, useNavigate } from "react-router-dom";
// import { errorHandler } from "@/lib/error-handler";
import AuthLayout from '../../layout/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

// import LogoDark from '@/images/logo/logo-dark.svg';
// import Logo from '@/images/logo/logo.svg';
// import AuthImage from '@/images/icon/auth-img.svg';
import InfoIcon from '@/images/icon/info.svg'

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const SignUp = () => {
  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();
  const RegisterSchema = yup.object().shape({
    username: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match",)
      .required("Confirm password is required",),
  });

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    toast.success('Registration successful! Please check your email.');
    console.log('data', data);
    sessionStorage.setItem('pendingVerificationEmail', data.email);
    register({ email: data.email, password: data.password, username: data.username });

    navigate('/auth/signin');
  
    // navigate('/auth/verification-pending');
  };

  return (
    <AuthLayout title="Sign Up for Delivery Dashboard">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-lg font-bold text-black">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }: any) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-lg font-bold text-black">User Name</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg"
                          placeholder="Enter User Name"
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
                  render={({ field }: any) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="flex text-lg font-bold text-black">
                        <p>Password</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="ml-3">
                                <img
                                  src={InfoIcon}
                                  alt="info"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="absolute -left-10 -top-[90px] right-auto mt-2 rounded-md bg-white p-3 shadow-lg">
                              <div className="relative">
                                {/* Tooltip Arrow */}
                                <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 bg-white shadow-lg" />
                                <p className="w-[380px] font-light text-neutral">
                                  The password must be at least 8 characters long and contain
                                  <br />
                                  at least three from the following character types: lower case,
                                  <br />
                                  CAPS, numerical (e.g. 12345), and special (e.g. -.#@!:; ).
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }: any) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-lg font-bold text-black">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  {isRegistering ? 'Registering...' : 'Register'}
                </Button>
              </form>
            <div className="flex justify-between mt-2 text-sm font-semibold ">
              <p className="w-fit ml-2">
                Already have an account?
              </p>
              <Link to="/auth/signin" className="text-primary mr-4">
                {" "} Log in
              </Link>
            </div>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
