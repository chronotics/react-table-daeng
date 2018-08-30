import styled from 'styled-components';

const Container = styled.div.attrs({
  style: props => ({ width: props.width, height: props.height }),
})`
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export default Container;
