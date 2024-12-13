import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useGetBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryFn: () => {
      if (!bookingId) throw new Error('Missing bookingId');
      return getBooking(bookingId);
    },
    queryKey: ['Bookings', bookingId],
  });

  return { isLoading, error, booking };
}
