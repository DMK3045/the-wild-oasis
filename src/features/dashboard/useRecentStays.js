import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last${numDays}days`],
  });
  //console.log('stays from the hook:::', stays);
  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );
  //console.log('confirmed stays from hook::', confirmedStays);

  return { isLoading, stays, confirmedStays, numDays };
}
