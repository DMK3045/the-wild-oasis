import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormState } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { errors } = useFormState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, mutate, errors };
}
