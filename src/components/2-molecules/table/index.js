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
    this._tableHeader = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._fixTop = this._fixTop.bind(this);
    this._renderColCells = this._renderColCells.bind(this);
    this._renderRowCells = this._renderRowCells.bind(this);
  }

  render() {
    const { _tableHeader, _onScroll, _renderColCells, _renderRowCells } = this;
    const {
      columns,
      rows,
      width,
      height,
      cellHeight,
      tableBodyMarginTop,
      tableBodyMarginBottom,
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
        <TableHead innerRef={_tableHeader} height={cellHeight}>
          {columns.map(_renderColCells)}
        </TableHead>
        <TableBody marginTop={`calc(${cellHeight} + ${tableBodyMarginTop})`}>
          {rows.map(_renderRowCells)}
          <div
            style={{
              height: tableBodyMarginBottom,
              minHeight: tableBodyMarginBottom,
            }}
          />
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
    const { _tableHeader } = this;
    _tableHeader.current.style.top = `${scrollTop}px`;
  }

  _renderColCells(col, idx) {
    const { selectedCols, onClickCell, onContextMenu, cellWidth } = this.props;
    return !col._renderCell_ ? (
      <Cell
        key={col._key_}
        width={col._width_ || cellWidth}
        borderTop={null}
        borderLeft={idx === 0 ? null : '1px #ebebeb solid'}
        defaultBg="#cccccc"
        onClick={event => onClickCell({ event, type: 'col', col })}
        onContextMenu={event => onContextMenu({ event, type: 'col', col })}
      >
        {col._title_ || ''}
      </Cell>
    ) : (
      col._renderCell_(col, selectedCols)
    );
  }

  _renderRowCells(row, rowIdx) {
    const {
      columns,
      selectedCols,
      selectedRows,
      cellWidth,
      cellHeight,
      onClickCell,
      onContextMenu,
    } = this.props;
    return !row._renderRow_ ? (
      <Row key={row._key_} height={row._height_ || cellHeight}>
        {({ state: { isHover } }) =>
          columns.map(
            (col, colIdx) =>
              !row._renderCell_ ? (
                <Cell
                  key={col._key_}
                  width={col._width_ || cellWidth}
                  borderTop={rowIdx === 0 ? null : '1px #ebebeb solid'}
                  borderLeft={colIdx === 0 ? null : '1px #ebebeb solid'}
                  isHover={isHover}
                  isSelected={
                    selectedCols.includes(col._key_) ||
                    selectedRows.includes(row._key_) ||
                    col._selected_ ||
                    row._selected_
                  }
                  onClick={event =>
                    onClickCell({ event, type: 'cell', row, col })
                  }
                  onContextMenu={event =>
                    onContextMenu({ event, type: 'cell', row, col })
                  }
                >
                  {row[col._dataIndex_] || ''}
                </Cell>
              ) : (
                row._renderCell_(row, col, selectedRows, selectedCols)
              ),
          )
        }
      </Row>
    ) : (
      row._renderRow_(row, columns, selectedRows, selectedCols)
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
  cellHeight: '40px',
  tableBodyMarginTop: '',
  tableBodyMarginBottom: '',
  onClickTable: () => {},
  onClickCell: () => {},
  onContextMenu: () => {},
  onScroll: () => {},
  setScrollRef: () => {},
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      _key_: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      _title_: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _dataIndex_: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      _width_: PropTypes.string,
      _renderCell_: PropTypes.func,
      _selected_: PropTypes.bool,
    }),
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      _key_: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      _height_: PropTypes.string,
      _renderRow_: PropTypes.func,
      _renderCell_: PropTypes.func,
      _selected_: PropTypes.bool,
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
  tableBodyMarginTop: PropTypes.string,
  tableBodyMarginBottom: PropTypes.string,
  onClickTable: PropTypes.func,
  onClickCell: PropTypes.func,
  onContextMenu: PropTypes.func,
  onScroll: PropTypes.func,
  setScrollRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Table;
