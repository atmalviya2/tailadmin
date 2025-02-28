import { axiosInstance } from '../lib/axios-instance';
// import { UserData } from '../types/users';

export const userService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get('/api/users');
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await axiosInstance.delete(`/api/users/${userId}`);
    return response.data;
  },

  resetUserPassword: async (userId: string) => {
    const response = await axiosInstance.put(`/api/users/resetPasswordByAdmin/${userId}`);
    return response.data;
  },

  updateUserStatus: async (userId: string, isApproved: boolean) => {
    const response = await axiosInstance.put(`/api/users/toggleUserVerification/${userId}`, {
      isApproved
    });
    return response.data;
  },

  updateUserProfile: async (data: {
    _id: string;
    username?: string;
    email?: string;
    fullName?: string;
    phoneNumber?: string;
    id: string;
  }) => {
    const response = await axiosInstance.put(`/api/users/${data._id}`, {
      userName: data.username,
      email: data.email,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber
    });
    return response.data;
  },

  updatePassword: async (data: {
    _id: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const response = await axiosInstance.put(`/api/users/resetPasswordByUser${data._id}`, {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  },

  getUserById: async (userId: string) => {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data;
  },
}; 