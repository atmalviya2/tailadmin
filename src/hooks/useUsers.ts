import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user';
import { toast } from 'react-hot-toast';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete user';
      toast.error(message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: userService.resetUserPassword,
    onSuccess: () => {
      toast.success('Password reset email sent');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to reset password';
      toast.error(message);
    },
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: ({ userId, isApproved }: { userId: string; isApproved: boolean }) =>
      userService.updateUserStatus(userId, isApproved),
    onSuccess: () => {
      toast.success('User status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update user status';
      toast.error(message);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateUserProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
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
  };
}; 