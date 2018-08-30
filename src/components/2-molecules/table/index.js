import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../1-atoms/container';
import TableHead from '../../1-atoms/table-head';
import TableBody from '../../1-atoms/table-body';
import Row from '../../1-atoms/row';
import Cell from '../../1-atoms/cell';

const defaultWidth = '100px';
const defaultHeight = '50px';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableHeader = React.createRef();
    this._fixTop = this._fixTop.bind(this);
    this._renderColCells = this._renderColCells.bind(this);
    this._renderRowCells = this._renderRowCells.bind(this);
  }

  render() {
    const { tableHeader, _fixTop, _renderColCells, _renderRowCells } = this;
    const { columns, rows, width, height, headHeight } = this.props;
    return (
      <Container width={width} height={height} onScroll={_fixTop}>
        <TableHead innerRef={tableHeader} height={headHeight}>
          {columns.map(_renderColCells)}
        </TableHead>
        <TableBody marginTop={headHeight}>
          {rows.map(_renderRowCells)}
        </TableBody>
      </Container>
    );
  }

  _fixTop({ target: { scrollTop } }) {
    const { tableHeader } = this;
    tableHeader.current.style.top = `${scrollTop}px`;
  }

  _renderColCells(col) {
    const { onClickCell, onContextMenu } = this.props;
    return !col.renderCell ? (
      <Cell
        key={col.key}
        width={col.width || defaultWidth}
        backgroundColor={col.selected ? 'gray' : '#eae5ea'}
        onClick={event => onClickCell({ event, type: 'col', col })}
        onContextMenu={event => onContextMenu({ event, type: 'col', col })}
      >
        {col.title || ''}
      </Cell>
    ) : (
      col.renderCell(col)
    );
  }

  _renderRowCells(row, idx) {
    const { columns, onClickCell, onContextMenu } = this.props;
    return !row.renderRow ? (
      <Row key={row.key} height={row.height || defaultHeight}>
        {columns.map(
          col =>
            !row.renderCell ? (
              <Cell
                key={col.key}
                width={col.width || defaultWidth}
                onClick={event =>
                  onClickCell({ event, type: 'cell', row, col })
                }
                onContextMenu={event =>
                  onContextMenu({ event, type: 'cell', row, col })
                }
                backgroundColor={
                  col.selected || row.selected
                    ? 'gray'
                    : idx % 2 === 0
                      ? '#ffffff'
                      : '#f4f2f4'
                }
              >
                {row[col.dataIndex] || ''}
              </Cell>
            ) : (
              row.renderCell(row, col)
            ),
        )}
      </Row>
    ) : (
      row.renderRow(row, columns)
    );
  }
}

Table.defaultProps = {
  columns: [],
  rows: [],
  width: '100%',
  height: '100%',
  headHeight: '50px',
  onClickCell: () => console.warn('[Table] No "onClickCell" prop'),
  onContextMenu: () => console.warn('[Table] No "onContextMenu" prop'),
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      width: PropTypes.string,
      renderCell: PropTypes.func,
      selected: PropTypes.bool,
    }),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      height: PropTypes.string,
      renderRow: PropTypes.func,
      renderCell: PropTypes.func,
      selected: PropTypes.bool,
    }),
  ),
  width: PropTypes.string,
  height: PropTypes.string,
  headHeight: PropTypes.string,
  onClickCell: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default Table;
