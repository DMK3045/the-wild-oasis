import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiLogin';
import { toast } from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateData, isLoading: isUpdatingData } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (_, variables) => {
      const { fullName, password } = variables;

      if (fullName) {
        toast.success('Successfully updated your userName.');
      } else if (password) {
        toast.success('Successfully updated your password.');
      }
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) =>
      toast.error(`Failed to update your info. ${error.message}`),
  });
  return { updateData, isUpdatingData };
}
