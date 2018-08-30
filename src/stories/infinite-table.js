import React, { Component } from 'react';
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

class InfiniteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: generateColumns(20),
      rows: generateRows(30, 20, 1),
      curMaxRow: 30,
    };
    this.scroller = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._addMoreRows = this._addMoreRows.bind(this);
  }

  render() {
    const { _onScroll, scroller } = this;
    const { columns, rows } = this.state;
    return (
      <Table
        width="500px"
        height="500px"
        columns={columns}
        rows={rows}
        onScroll={_onScroll}
        setScrollRef={scroller}
      />
    );
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
