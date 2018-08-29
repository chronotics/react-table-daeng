import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div.attrs({
  style: props => ({ width: props.width, height: props.height }),
})`
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TableHead = styled.div.attrs({
  style: props => ({ height: props.height }),
})`
  position: absolute;
  width: 100%;
  display: flex;
`;

const TableBody = styled.div.attrs({
  style: props => ({ marginTop: props.marginTop }),
})`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div.attrs({
  style: props => ({ height: props.height, minHeight: props.height }),
})`
  display: flex;
`;

const Cell = styled.div.attrs({
  style: props => ({ width: props.width, minWidth: props.width }),
})`
  background-color: ${props => props.backgroundColor};
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
    const {
      columns,
      rows,
      width,
      height,
      headHeight,
      onClickCell,
    } = this.props;
    const defaultWidth = '100px';
    const defaultHeight = '50px';
    return (
      <Container width={width} height={height} innerRef={tableContainer}>
        <TableHead innerRef={tableHeader} height={headHeight}>
          {columns.map(col => (
            <Cell
              key={col.key}
              width={col.width || defaultWidth}
              backgroundColor="white"
              onClick={event => onClickCell({ event, type: 'col', col })}
            >
              {col.title || ''}
            </Cell>
          ))}
        </TableHead>
        <TableBody marginTop={headHeight}>
          {rows.map(row => (
            <Row key={row.key} height={row.height || defaultHeight}>
              {columns.map(col => (
                <Cell
                  key={col.key}
                  width={col.width || defaultWidth}
                  onClick={event =>
                    onClickCell({ event, type: 'cell', row, col })
                  }
                >
                  {row[col.dataIndex] || ''}
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
  headHeight: '50px',
  onClickCell: () => console.warn('[Table] No "onClickCell" prop'),
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.string,
    }),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      height: PropTypes.string,
    }),
  ),
  width: PropTypes.string,
  height: PropTypes.string,
  headHeight: PropTypes.string,
  onClickCell: PropTypes.func,
};

export default Table;
