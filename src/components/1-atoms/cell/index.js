import styled from 'styled-components';

const Cell = styled.div.attrs({
  style: props => ({ width: props.width, minWidth: props.width }),
})`
  background-color: ${props => props.backgroundColor};
`;

export default Cell;
