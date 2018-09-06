import React, { Component, Fragment } from 'react';
import { Table } from '../components';

const generateColumns = num =>
  [...Array(num)].map((v, i) => ({
    key: `${i + 1}`,
    title: `COL_${i + 1}`,
    dataIndex: `${i + 1}`,
  }));

const generateRows = (rowNum, colNum, start) =>
  [...Array(rowNum)].map((v, i) => {
    const obj = { key: `${i + start}` };
    [...Array(colNum)].forEach((v, j) => {
      obj[j + 1] = `${i + start}-${j + 1}`;
    });
    return obj;
  });

const ContextMenu = ({ onOff, x, y, colKey, rowKey }) =>
  onOff ? (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: '180px',
        height: '30px',
        border: '1px solid black',
        boxSizing: 'border-box',
        backgroundColor: 'skyblue',
      }}
    >{`row: ${rowKey}, col: ${colKey}`}</div>
  ) : null;

class InfiniteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: generateColumns(20),
      rows: generateRows(30, 20, 1),
      curMaxRow: 30,
      selectedRows: [],
      selectedCols: [],
      contextMenu: {
        onOff: false,
        x: 0,
        y: 0,
        row: '',
        col: '',
      },
    };
    this.scroller = React.createRef();
    this._onClickCell = this._onClickCell.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._addMoreRows = this._addMoreRows.bind(this);
  }

  render() {
    const { _onClickCell, _onContextMenu, _onScroll, scroller } = this;
    const {
      columns,
      rows,
      selectedCols,
      selectedRows,
      contextMenu: { onOff, x, y, row, col },
    } = this.state;
    return (
      <Fragment>
        <Table
          width="500px"
          height="500px"
          columns={columns}
          rows={rows}
          selectedCols={selectedCols}
          selectedRows={selectedRows}
          onClickCell={_onClickCell}
          onContextMenu={_onContextMenu}
          onScroll={_onScroll}
          setScrollRef={scroller}
        />
        <ContextMenu onOff={onOff} x={x} y={y} rowKey={row} colKey={col} />
      </Fragment>
    );
  }

  _onClickCell({ type, col, row }) {
    switch (type) {
    case 'col':
      this.setState({
        selectedCols: [col.key],
        selectedRows: [],
        contextMenu: {
          onOff: false,
          x: 0,
          y: 0,
          row: '',
          col: '',
        },
      });
      break;
    case 'cell':
      this.setState({
        selectedCols: [],
        selectedRows: [row.key],
        contextMenu: {
          onOff: false,
          x: 0,
          y: 0,
          row: '',
          col: '',
        },
      });
      break;
    default:
    }
  }

  _onContextMenu({ event, row, col }) {
    event.preventDefault();
    this.setState({
      contextMenu: {
        onOff: true,
        x: event.clientX,
        y: event.clientY,
        row: row ? row.key : 'None',
        col: col.key,
      },
    });
  }

  _onScroll({ target: { scrollTop, offsetHeight, scrollHeight } }) {
    const { _addMoreRows } = this;
    console.log(
      `scrollTop: ${scrollTop} | offsetHeight: ${offsetHeight} | scrollHeight: ${scrollHeight}`,
    );
    if (scrollTop + offsetHeight >= scrollHeight) {
      console.log('end');
      _addMoreRows();
    }
  }

  _addMoreRows() {
    const {
      scroller: { current: scroller },
    } = this;
    this.setState(
      prevState => ({
        ...prevState,
        rows: [
          ...prevState.rows,
          ...generateRows(30, 20, prevState.curMaxRow + 1),
        ],
        curMaxRow: prevState.curMaxRow + 30,
      }),
      () => {
        scroller.scrollTop = scroller.scrollTop + 50;
        console.log(`After setState curMaxRow: ${this.state.curMaxRow}`);
      },
    );
  }
}

export default InfiniteTable;
