import React, { Component } from 'react';
import { Table } from '../components';

const unselectAllRows = rows => rows.map(row => ({ ...row, selected: false }));

const unselectAllColumns = columns =>
  columns.map(col => ({ ...col, selected: false }));

const selectOneCol = (columns, key) => {
  const colIndex = columns.findIndex(col => col.key === key);
  return [
    ...columns.slice(0, colIndex).map(col => ({ ...col, selected: false })),
    { ...columns[colIndex], selected: true },
    ...columns.slice(colIndex + 1).map(col => ({ ...col, selected: false })),
  ];
};

const selectOneRow = (rows, key) => {
  const rowIndex = rows.findIndex(row => row.key === key);
  return [
    ...rows.slice(0, rowIndex).map(row => ({ ...row, selected: false })),
    { ...rows[rowIndex], selected: true },
    ...rows.slice(rowIndex + 1).map(row => ({ ...row, selected: false })),
  ];
};

class SelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        ...[...Array(20)].map((v, i) => ({
          key: `${i + 1}`,
          title: `COL_${i + 1}`,
          dataIndex: `${i + 1}`,
          selected: false,
        })),
      ],
      rows: [
        ...[...Array(30)].map((v, i) => {
          const obj = { key: `${i + 1}`, selected: false };
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

  _onClickCol(e, { key }) {
    this.setState(prevState => ({
      ...prevState,
      rows: unselectAllRows(prevState.rows),
      columns: selectOneCol(prevState.columns, key),
    }));
  }

  _onClickRow(e, { key }) {
    this.setState(prevState => ({
      ...prevState,
      columns: unselectAllColumns(prevState.columns),
      rows: selectOneRow(prevState.rows, key),
    }));
  }
}

export default SelectTable;
