import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: apiDeleteBooking, isLoading: isDeletingBooking } =
    useMutation({
      mutationFn: (id) => deleteBooking(id),
      onSuccess: () => {
        toast.success(`Booking  was successfully Deleted`);
        queryClient.invalidateQueries({ active: true });
      },
      onError: (error) => {
        console.error('Deleting booking error,', error);
        toast.error('Failed to delete in this booking');
      },
    });

  return { apiDeleteBooking, isDeletingBooking };
}
