import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch1';
import { UserData } from '@/types/users';

const UserManagement = () => {
  const { users, isLoading, deleteUser, resetPassword, updateUserStatus, isUpdatingStatus } = useUsers(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);

  console.log(users)
  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleResetPassword = (user: UserData) => {
    setSelectedUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser._id);
    }
    setIsDeleteDialogOpen(false);
  };

  const confirmResetPassword = () => {
    if (selectedUser) {
      resetPassword(selectedUser._id);
    }
    setIsResetPasswordDialogOpen(false);
  };

  const handleStatusChange = (userId: string, isApproved: boolean) => {
    updateUserStatus({ userId, isApproved });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center font-bold text-2xl mb-4">
        <p>User Management</p>
      </div>
      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reset Password</TableHead>
            <TableHead>Delete User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: UserData, index: number) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.userName || '-'}</TableCell>
              <TableCell>
                <Switch
                  checked={user._verified}
                  disabled={isUpdatingStatus}
                  onCheckedChange={(checked) => handleStatusChange(user._id, checked)}
                />
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  onClick={() => handleResetPassword(user)}
                >
                  Reset Password
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user {selectedUser?.email}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Confirmation Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Password Reset</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the password for user {selectedUser?.email}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmResetPassword}>
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
