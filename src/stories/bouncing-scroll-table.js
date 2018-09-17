import React, { Component } from 'react';
import { Table } from '../components';

const generateColumns = num =>
  [...Array(num)].map((v, i) => ({
    _key_: `${i + 1}`,
    _title_: `COL_${i + 1}`,
    _dataIndex_: `${i + 1}`,
  }));

const generateRows = (rowNum, colNum, start) =>
  [...Array(rowNum)].map((v, i) => {
    const obj = { _key_: `${i + start}` };
    [...Array(colNum)].forEach((v, j) => {
      obj[j + 1] = `${i + start}-${j + 1}`;
    });
    return obj;
  });

const TABLE_MARGIN = 300;
const SCROLL_MARGIN = 60;

class BouncingScrollTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: generateColumns(20),
      rows: generateRows(30, 20, 1),
      page: 0,
    };
    this._scroller = React.createRef();
    this._onScroll = this._onScroll.bind(this);
    this._pageUp = this._pageUp.bind(this);
    this._pageDown = this._pageDown.bind(this);
  }

  render() {
    const { _scroller, _onScroll } = this;
    const { columns, rows } = this.state;
    return (
      <Table
        width="500px"
        height="500px"
        tableBodyMarginTop={`${TABLE_MARGIN}px`}
        tableBodyMarginBottom={`${TABLE_MARGIN}px`}
        columns={columns}
        rows={rows}
        onScroll={_onScroll}
        setScrollRef={_scroller}
      />
    );
  }

  componentDidMount() {
    this._scroller.current.scrollTop = TABLE_MARGIN;
  }

  _onScroll({ target }) {
    const { _pageUp, _pageDown } = this;
    const { scrollTop, scrollHeight, clientHeight } = target;
    if (scrollTop < TABLE_MARGIN - SCROLL_MARGIN) return _pageUp();
    if (
      scrollTop >
      scrollHeight - clientHeight - (TABLE_MARGIN - SCROLL_MARGIN)
    )
      return _pageDown();
  }

  _pageUp() {
    const {
      _scroller: { current: scroller },
    } = this;
    const { page } = this.state;
    if (page === 0) {
      scroller.scrollTop = TABLE_MARGIN;
      alert('first page');
      return;
    }
    this.setState(
      prevState => ({
        ...prevState,
        rows: generateRows(30, 20, (prevState.page - 1) * 30 + 1),
        page: prevState.page - 1,
      }),
      () =>
        (scroller.scrollTop =
          scroller.scrollHeight - scroller.clientHeight - TABLE_MARGIN),
    );
  }

  _pageDown() {
    const {
      _scroller: { current: scroller },
    } = this;
    const { page } = this.state;
    if (page === 9) {
      scroller.scrollTop =
        scroller.scrollHeight - scroller.clientHeight - TABLE_MARGIN;
      alert('last page');
      return;
    }
    this.setState(
      prevState => ({
        ...prevState,
        rows: generateRows(30, 20, (prevState.page + 1) * 30 + 1),
        page: prevState.page + 1,
      }),
      () => (scroller.scrollTop = TABLE_MARGIN),
    );
  }
}

export default BouncingScrollTable;
