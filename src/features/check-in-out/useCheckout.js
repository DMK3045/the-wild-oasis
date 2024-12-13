import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast.error('Failed to check out this booking');
    },
  });

  return { checkout, isCheckingOut };
}
