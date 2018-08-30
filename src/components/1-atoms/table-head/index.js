import styled from 'styled-components';

const TableHead = styled.div.attrs({
  style: props => ({ height: props.height }),
})`
  position: absolute;
  width: 100%;
  display: flex;
`;

export default TableHead;
