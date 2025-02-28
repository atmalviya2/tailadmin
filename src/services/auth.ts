import { axiosInstance } from '../lib/axios-instance';
import Cookies from 'js-cookie';


export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    console.log('data in service', data);
    try {
      const response = await axiosInstance.post('/api/users/register', {
        email: data.email,
        password: data.password,
        name: data.username,
        role: 'user',
      });
      console.log('response in service', response);
      return response.data;
    } catch (error) {
      console.log('error in service', error);
      throw error;
    }
  },

  verifyEmail: async (token: string) => {
    const response = await axiosInstance.post('/api/users/verify-email', { token });
    if (response.data.token) {
      Cookies.set('token', response.data.token);
    }
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await axiosInstance.post('/api/users/resend-verification', { email });
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axiosInstance.post('/api/users/login', data);
    if (response.data.token) {
      Cookies.set('token', response.data.token);
    }
    return response.data;
  },
}; 