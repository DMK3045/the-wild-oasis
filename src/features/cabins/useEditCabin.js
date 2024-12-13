import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isEditing, updateCabin };
}
