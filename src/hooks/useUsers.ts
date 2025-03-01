import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user';
import { toast } from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUser();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });

  const getUserById = useMutation({
    mutationFn: userService.getUserById,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to get user';
      toast.error(message);
    },
  });

  // Fetch user details when component mounts
  useEffect(() => {
    if (user?._id) {
      getUserById.mutate(user._id);
    }
  }, [user?._id]);

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete user';
      toast.error(message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: userService.resetUserPassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to reset password';
      toast.error(message);
    },
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: ({ userId, isApproved }: { userId: string; isApproved: boolean }) =>
      userService.updateUserStatus(userId, isApproved),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update user status';
      toast.error(message);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateUserProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update password';
      toast.error(message);
    },
  });

  return {
    users,
    isLoading,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
    resetPassword: resetPasswordMutation.mutate,
    isResetting: resetPasswordMutation.isPending,
    updateUserStatus: updateUserStatusMutation.mutate,
    isUpdatingStatus: updateUserStatusMutation.isPending,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updatePassword: updatePasswordMutation.mutate,
    isUpdatingPassword: updatePasswordMutation.isPending,
    userDetails: getUserById.data,
    isLoadingUser: getUserById.isPending,
    getUserById: getUserById.mutate,
    isGettingUser: getUserById.isPending,
  };
}; 