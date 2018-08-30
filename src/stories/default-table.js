import React, { Component } from 'react';
import { Table } from '../components/index';

class DefaultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        ...[...Array(20)].map((v, i) => ({
          key: `${i + 1}`,
          title: `COL_${i + 1}`,
          dataIndex: `${i + 1}`,
        })),
      ],
      rows: [
        ...[...Array(30)].map((v, i) => {
          const obj = { key: `${i + 1}` };
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
        onClickCell={_onClickCell}
      />
    );
  }

  _onClickCell({ event, type, row, col }) {
    console.log(type, row, col);
  }
}

export default DefaultTable;
