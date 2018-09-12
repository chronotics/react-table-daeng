import React, { Component, Fragment } from 'react';
import { Table } from '../components';

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

class ContextMenuTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        ...[...Array(20)].map((v, i) => ({
          _key_: `${i + 1}`,
          _title_: `COL_${i + 1}`,
          _dataIndex_: `${i + 1}`,
        })),
      ],
      rows: [
        ...[...Array(30)].map((v, i) => {
          const obj = { _key_: `${i + 1}` };
          [...Array(20)].forEach((v, j) => {
            obj[j + 1] = `${i + 1}-${j + 1}`;
          });
          return obj;
        }),
      ],
      onOff: false,
      x: 0,
      y: 0,
      rowKey: '',
      colKey: '',
    };
    this._onClickCell = this._onClickCell.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
  }

  render() {
    const { _onClickCell, _onContextMenu } = this;
    const { columns, rows, onOff, x, y, rowKey, colKey } = this.state;
    return (
      <Fragment>
        <Table
          width="500px"
          height="500px"
          columns={columns}
          rows={rows}
          onClickCell={_onClickCell}
          onContextMenu={_onContextMenu}
        />
        <ContextMenu
          onOff={onOff}
          x={x}
          y={y}
          rowKey={rowKey}
          colKey={colKey}
        />
      </Fragment>
    );
  }

  _onClickCell({ event, type, row, col }) {
    this.setState({
      onOff: false,
      x: 0,
      y: 0,
      rowKey: '',
      colKey: '',
    });
  }

  _onContextMenu({ event, type, row, col }) {
    event.preventDefault();
    this.setState({
      onOff: true,
      x: event.clientX,
      y: event.clientY,
      rowKey: row ? row._key_ : 'None',
      colKey: col._key_,
    });
  }
}

export default ContextMenuTable;
