import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterfield, options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Validate options
  if (!options || options.length === 0) {
    console.error('Filter options are missing or empty.');
    return null; // Avoid rendering if no options are provided
  }

  function handleClick(value) {
    searchParams.set(filterfield, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams); // Remove fallback logic
  }

  const currentValue = searchParams.get(filterfield) || options[0].value; // Default to the first option if not set

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentValue === option.value}
          disabled={currentValue === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
