import { useSearchParams } from 'react-router-dom';
import Select from './Select';

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  const currentSortBy = searchParams.get('sortBy' || '');
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={currentSortBy}
    />
  );
}
