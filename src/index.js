import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from './components';

ReactDOM.render(
  <Table
    columns={[
      { key: '1', title: 'COL_1', dataIndex: '1' },
      { key: '2', title: 'COL_2', dataIndex: '2' },
      { key: '3', title: 'COL_3', dataIndex: '3' },
    ]}
    rows={[
      { key: '1', 1: '11', 2: '12', 3: '13' },
      { key: '2', 1: '21', 2: '22', 3: '23' },
    ]}
    width="500px"
    height="500px"
  />,
  document.getElementById('root'),
);
