import styled from 'styled-components';

const FormRowContainer = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
    border-radius: 4px;
    font-size: 1.5rem;
  }

  .error-message {
    color: red;
    font-size: 1rem;
    margin-top: 0.25rem;
  }
`;

export default function FormRow({ label, children, error }) {
  return (
    <FormRowContainer hasError={!!error}>
      {label && <label>{label}</label>}
      {children}
      {error && <div className="error-message">{error}</div>}
    </FormRowContainer>
  );
}
