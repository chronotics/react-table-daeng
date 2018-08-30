import styled from 'styled-components';

const Row = styled.div.attrs({
  style: props => ({ height: props.height, minHeight: props.height }),
})`
  display: flex;
`;

export default Row;
