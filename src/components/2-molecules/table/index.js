import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div.attrs({
  style: props => ({ width: props.width, height: props.height }),
})`
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: white;
`;

const TableBody = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  min-height: 50px;
`;

const Cell = styled.div.attrs({
  style: props => ({ width: props.width, minWidth: props.width }),
})`
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `};
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableContainer = React.createRef();
    this.tableHeader = React.createRef();
    this._fixTop = this._fixTop.bind(this);
  }

  render() {
    const { tableContainer, tableHeader } = this;
    const { columns, rows, width, height } = this.props;
    return (
      <Container width={width} height={height} innerRef={tableContainer}>
        <TableHeader innerRef={tableHeader}>
          {columns.map(col => (
            <Cell key={col.key} width="100px" backgroundColor="white">
              {col.title}
            </Cell>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map(row => (
            <Row key={row.key}>
              {columns.map(col => (
                <Cell key={col.key} width="100px">
                  {row[col.dataIndex]}
                </Cell>
              ))}
            </Row>
          ))}
        </TableBody>
      </Container>
    );
  }

  componentDidMount() {
    const { tableContainer, _fixTop } = this;
    tableContainer.current.addEventListener('scroll', _fixTop);
  }

  componentWillUnmount() {
    const { tableContainer, _fixTop } = this;
    tableContainer.current.removeEventHandler('scroll', _fixTop);
  }

  _fixTop({ target: { scrollTop } }) {
    const { tableHeader } = this;
    tableHeader.current.style.top = `${scrollTop}px`;
  }
}

Table.defaultProps = {
  columns: [],
  rows: [],
  width: '100%',
  height: '100%',
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Table;
