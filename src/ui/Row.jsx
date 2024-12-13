import styled, { css } from 'styled-components';

const Row = styled.div`
  ${(props) =>
    props.type === 'horizontal' &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    `}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
