import React, { Component } from 'react';
import { Table } from '../components';

class FixedColumnsTable extends Component {
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
    };
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
        fixedColNum={2}
        onClickCell={_onClickCell}
      />
    );
  }

  _onClickCell({ event, type, row, col }) {
    console.log(type, row, col);
  }
}

export default FixedColumnsTable;
