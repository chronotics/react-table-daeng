import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from './components';

ReactDOM.render(
  <div
    style={{
      width: '600px',
      height: '600px',
      border: '1px solid blue',
      boxSizing: 'border-box',
    }}
  >
    <Table
      columns={[
        { key: '1', title: 'COL_1', dataIndex: '1' },
        { key: '2', title: 'COL_2', dataIndex: '2' },
        { key: '3', title: 'COL_3', dataIndex: '3' },
      ]}
      rows={[
        ...[...Array(30)].map((v, i) => ({
          key: `${i + 1}`,
          1: `${i + 1}-1`,
          2: `${i + 1}-2`,
          3: `${i + 1}-3`,
        })),
      ]}
      width="100%"
      height="100%"
    />
  </div>,
  document.getElementById('root'),
);
