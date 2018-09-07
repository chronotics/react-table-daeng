import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../1-atoms/container';
import TableHead from '../../1-atoms/table-head';
import TableBody from '../../1-atoms/table-body';
import Row from '../../1-atoms/row';
import Cell from '../../1-atoms/cell';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableHeader = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._fixTop = this._fixTop.bind(this);
    this._renderColCells = this._renderColCells.bind(this);
    this._renderRowCells = this._renderRowCells.bind(this);
  }

  render() {
    const { tableHeader, _onScroll, _renderColCells, _renderRowCells } = this;
    const {
      columns,
      rows,
      width,
      height,
      cellHeight,
      setScrollRef,
      onClickTable,
    } = this.props;
    return (
      <Container
        width={width}
        height={height}
        onScroll={_onScroll}
        innerRef={setScrollRef}
        onClick={onClickTable}
      >
        <TableHead innerRef={tableHeader} height={cellHeight}>
          {columns.map(_renderColCells)}
        </TableHead>
        <TableBody marginTop={cellHeight}>
          {rows.map(_renderRowCells)}
        </TableBody>
      </Container>
    );
  }

  _onScroll(event) {
    const { _fixTop } = this;
    const { onScroll } = this.props;
    _fixTop(event);
    onScroll(event);
  }

  _fixTop({ target: { scrollTop } }) {
    const { tableHeader } = this;
    tableHeader.current.style.top = `${scrollTop}px`;
  }

  _renderColCells(col) {
    const { selectedCols, onClickCell, onContextMenu, cellWidth } = this.props;
    return !col.renderCell ? (
      <Cell
        key={col.key}
        width={col.width || cellWidth}
        backgroundColor={
          selectedCols.includes(col.key) || col.selected ? 'gray' : '#eae5ea'
        }
        onClick={event => onClickCell({ event, type: 'col', col })}
        onContextMenu={event => onContextMenu({ event, type: 'col', col })}
      >
        {col.title || ''}
      </Cell>
    ) : (
      col.renderCell(col, selectedCols)
    );
  }

  _renderRowCells(row, idx) {
    const {
      columns,
      selectedCols,
      selectedRows,
      cellWidth,
      cellHeight,
      onClickCell,
      onContextMenu,
    } = this.props;
    return !row.renderRow ? (
      <Row key={row.key} height={row.height || cellHeight}>
        {columns.map(
          col =>
            !row.renderCell ? (
              <Cell
                key={col.key}
                width={col.width || cellWidth}
                onClick={event =>
                  onClickCell({ event, type: 'cell', row, col })
                }
                onContextMenu={event =>
                  onContextMenu({ event, type: 'cell', row, col })
                }
                backgroundColor={
                  selectedCols.includes(col.key) ||
                  selectedRows.includes(row.key) ||
                  col.selected ||
                  row.selected
                    ? 'gray'
                    : idx % 2 === 0
                      ? '#ffffff'
                      : '#f4f2f4'
                }
              >
                {row[col.dataIndex] || ''}
              </Cell>
            ) : (
              row.renderCell(row, col, selectedRows, selectedCols)
            ),
        )}
      </Row>
    ) : (
      row.renderRow(row, columns, selectedRows, selectedCols)
    );
  }
}

Table.defaultProps = {
  columns: [],
  rows: [],
  selectedCols: [],
  selectedRows: [],
  width: '100%',
  height: '100%',
  cellWidth: '100px',
  cellHeight: '50px',
  onClickTable: () => {},
  onClickCell: () => {},
  onContextMenu: () => {},
  onScroll: () => {},
  setScrollRef: () => {},
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
  selectedCols: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  selectedRows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  width: PropTypes.string,
  height: PropTypes.string,
  cellWidth: PropTypes.string,
  cellHeight: PropTypes.string,
  onClickTable: PropTypes.func,
  onClickCell: PropTypes.func,
  onContextMenu: PropTypes.func,
  onScroll: PropTypes.func,
  setScrollRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Table;
