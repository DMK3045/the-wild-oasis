import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useGetCabins } from '../cabins/useGetCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { cabins, isLoading: isLoadingCabins } = useGetCabins();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  // console.log('bookings from Dashboard layout:::', bookings);
  // console.log('confirmed stays from Dashboard layout:::', confirmedStays);
  // console.log('stays from Dashboard layout:::', stays);
  return (
    <StyledDashboardLayout>
      <Stats
        confirmedStays={confirmedStays}
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
