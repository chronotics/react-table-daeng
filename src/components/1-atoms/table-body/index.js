import styled from 'styled-components';

const TableBody = styled.div.attrs({
  style: props => ({ marginTop: props.marginTop }),
})`
  display: flex;
  flex-direction: column;
`;

export default TableBody;
