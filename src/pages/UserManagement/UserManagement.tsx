import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UserData } from '@/types/users';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


interface UserManagementProps {
  userData: UserData[] | [];
}

const UserManagement: React.FC<UserManagementProps> = () => {
  const userData: UserData[] = [
    { email: 'john.doe@example.com', isApproved: true, id: 1 },
    { email: 'jane.smith@example.com', isApproved: false, id: 2 },
    { email: 'mike.wilson@example.com', isApproved: true, id: 3 },
    { email: 'sarah.brown@example.com', isApproved: false, id: 4 },
  ];
  const [sortOrder, setSortOrder] = useState<{ [key: string]: 'asc' | 'desc' }>(
    {},
  );
  const [sortedData, setSortedData] = useState(userData);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);

  // useEffect(() => {
  //   setSortedData(userData);
  // }, [userData]);

  const toggleSortOrder = (key: keyof UserData) => {
    setSortOrder((prevSortOrder) => {
      const newOrder = prevSortOrder[key] === 'asc' ? 'desc' : 'asc';
      return {
        ...prevSortOrder,
        [key]: newOrder,
      };
    });

    setSortedData((prevData) => {
      const orderMultiplier = sortOrder[key] === 'asc' ? 1 : -1;
      return prevData.sort((a, b) => {
        if (a[key] < b[key]) return -1 * orderMultiplier;
        if (a[key] > b[key]) return 1 * orderMultiplier;
        return 0;
      });
    });
  };

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
      console.log('Deleting user:', selectedUser.id);
      setSortedData(sortedData.filter(user => user.id !== selectedUser.id));
    }
    setIsDeleteDialogOpen(false);
  };

  const confirmResetPassword = () => {
    if (selectedUser) {
      console.log('Resetting password for user:', selectedUser.id);
    }
    setIsResetPasswordDialogOpen(false);
  };

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
            <TableHead className="w-[200px]">
              <div className="flex items-center gap-1.5">
                <img
                  src="/assets/compare-arrows.svg"
                  alt="icon"
                  width={19}
                  height={19}
                  onClick={() => toggleSortOrder('email')}
                  className="cursor-pointer"
                />
                Email
              </div>
            </TableHead>
            <TableHead>Approve</TableHead>
            <TableHead>Reset Password</TableHead>
            <TableHead>Delete User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.slice(0, 10).map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                  {user.isApproved ? 'Approved' : 'Pending'}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleResetPassword(user)}
                >
                  Reset
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
            <Button onClick={confirmResetPassword} variant="destructive" className="bg-red-500 hover:bg-red-600">
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserManagement;
