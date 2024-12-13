import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/helpers';

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const { isLoading, data, error } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ['Bookings', filter, sortBy, page],
  });

  // Handle data safely
  const bookings = data?.data || [];
  const count = data?.count || 0;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Prefetch next page
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ['Bookings', filter, sortBy, page + 1],
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ['Bookings', filter, sortBy, page - 1],
    });
  }

  return { isLoading, bookings, error, count };
}
