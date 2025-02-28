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
    username?: string;
    fullName?: string;
    phoneNumber?: string;
    id: string;
  }) => {
    const response = await axiosInstance.put(`/api/users/${data.id}`, data);
    return response.data;
  },

  updatePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await axiosInstance.put('/api/users/password', data);
    return response.data;
  },
}; 