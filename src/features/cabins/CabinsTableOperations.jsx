import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

export default function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterfield="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No Discount' },
          { value: 'with-discount', label: 'With Discount' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name(A-Z)' },
          { value: 'name-desc', label: 'Sort by name(Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price(Low-first)' },
          { value: 'regularPrice-desc', label: 'Sort by price(High-first)' },
          { value: 'maxCapacity-asc', label: 'Sort by Capacity(Low-first)' },
          { value: 'maxCapacity-desc', label: 'Sort by Capacity(High-first)' },
        ]}
      />
    </TableOperations>
  );
}
