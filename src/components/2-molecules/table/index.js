import React, { Component } from 'react';
import styled from 'styled-components';

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
  style: props => ({ width: props.width }),
})``;

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableContainer = React.createRef();
    this.tableHeader = React.createRef();
  }

  render() {
    const { tableContainer, tableHeader } = this;
    const { columns, rows, width, height } = this.props;
    return (
      <Container width={width} height={height} innerRef={tableContainer}>
        <TableHeader innerRef={tableHeader}>
          {columns.map(col => (
            <Cell key={col.key} width="100px">
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
    const { tableContainer, tableHeader } = this;
    tableContainer.current.addEventListener(
      'scroll',
      ({ target: { scrollTop, scrollLeft } }) => {
        tableHeader.current.style.top = `${scrollTop}px`;
        tableHeader.current.style.left = `${scrollLeft}px`;
      },
    );
  }
}

Table.defaultProps = {
  columns: [],
  rows: [],
  width: '100%',
  height: '100%',
};

export default Table;
