import React, { Component } from 'react';
import { Table } from '../components';

const unselectAllRows = rows =>
  rows.map(row => ({ ...row, _selected_: false }));

const unselectAllColumns = columns =>
  columns.map(col => ({ ...col, _selected_: false }));

const selectOneCol = (columns, key) => {
  const colIndex = columns.findIndex(col => col._key_ === key);
  return [
    ...columns.slice(0, colIndex).map(col => ({ ...col, _selected_: false })),
    { ...columns[colIndex], _selected_: true },
    ...columns.slice(colIndex + 1).map(col => ({ ...col, _selected_: false })),
  ];
};

const selectOneRow = (rows, key) => {
  const rowIndex = rows.findIndex(row => row._key_ === key);
  return [
    ...rows.slice(0, rowIndex).map(row => ({ ...row, _selected_: false })),
    { ...rows[rowIndex], _selected_: true },
    ...rows.slice(rowIndex + 1).map(row => ({ ...row, _selected_: false })),
  ];
};

class SelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        ...[...Array(20)].map((v, i) => ({
          _key_: `${i + 1}`,
          _title_: `COL_${i + 1}`,
          _dataIndex_: `${i + 1}`,
          _selected_: false,
        })),
      ],
      rows: [
        ...[...Array(30)].map((v, i) => {
          const obj = { _key_: `${i + 1}`, _selected_: false };
          [...Array(20)].forEach((v, j) => {
            obj[j + 1] = `${i + 1}-${j + 1}`;
          });
          return obj;
        }),
      ],
    };
    this._onClickCell = this._onClickCell.bind(this);
    this._onClickCol = this._onClickCol.bind(this);
    this._onClickRow = this._onClickRow.bind(this);
  }

  render() {
    const { _onClickCell } = this;
    const { columns, rows } = this.state;
    return (
      <Table
        width="500px"
        height="500px"
        columns={columns}
        rows={rows}
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
      rows: unselectAllRows(prevState.rows),
      columns: selectOneCol(prevState.columns, _key_),
    }));
  }

  _onClickRow(e, { _key_ }) {
    this.setState(prevState => ({
      ...prevState,
      columns: unselectAllColumns(prevState.columns),
      rows: selectOneRow(prevState.rows, _key_),
    }));
  }
}

export default SelectTable;
