import React, { Component } from 'react';
import { Table } from '../components';

const COL_COUNT = 20;
const ROW_COUNT = 100;

class SelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [...Array(COL_COUNT)].map((v, i) => ({
        _key_: `${i + 1}`,
        _title_: `COL_${i + 1}`,
        _dataIndex_: `${i + 1}`,
      })),
      rows: [...Array(ROW_COUNT)].map((v, i) => {
        const obj = { _key_: `${i + 1}` };
        [...Array(COL_COUNT)].forEach((v, j) => {
          obj[j + 1] = `${i + 1}-${j + 1}`;
        });
        return obj;
      }),
      selectedCols: [],
      selectedRows: [],
    };
    this._onClickCell = this._onClickCell.bind(this);
    this._onClickCol = this._onClickCol.bind(this);
    this._onClickRow = this._onClickRow.bind(this);
  }

  render() {
    const { _onClickCell } = this;
    const { columns, rows, selectedCols, selectedRows } = this.state;
    return (
      <Table
        width="500px"
        height="500px"
        columns={columns}
        rows={rows}
        selectedCols={selectedCols}
        selectedRows={selectedRows}
        onClickCell={_onClickCell}
      />
    );
  }

  _onClickCell({ event, type, row, col }) {
    const { _onClickCol, _onClickRow } = this;
    type === 'col' ? _onClickCol(event, col) : _onClickRow(event, row);
  }

  _onClickCol(e, { _key_ }) {
    this.setState(prevState => ({
      ...prevState,
      selectedCols: [_key_],
      selectedRows: [],
    }));
  }

  _onClickRow(e, { _key_ }) {
    this.setState(prevState => ({
      ...prevState,
      selectedCols: [],
      selectedRows: [_key_],
    }));
  }
}

export default SelectTable;
