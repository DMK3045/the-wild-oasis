import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useGetCabins } from './useGetCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

export default function CabinTable() {
  const { isLoading, cabins = [] } = useGetCabins(); // Fallback to empty array if cabins is undefined

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || 'all';

  // Return loading spinner early
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // Filter cabins based on filterValue
  let filteredCabins = cabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.includes('-')
    ? sortBy.split('-')
    : ['startDate', 'asc'];

  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
