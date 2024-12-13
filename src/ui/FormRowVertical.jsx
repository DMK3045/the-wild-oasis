import styled from 'styled-components';

const FormRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-grey-700);
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1.6rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 0.4rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }
  }

  button {
    align-self: stretch; /* Ensures the button takes full width */
  }
`;

function FormRowVertical({ label, children }) {
  return (
    <FormRowWrapper>
      {label && <label>{label}</label>}
      {children}
    </FormRowWrapper>
  );
}

export default FormRowVertical;
