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
        ...[...Array(20)].map((v, i) => ({
          key: `${i + 1}`,
          title: `COL_${i + 1}`,
          dataIndex: `${i + 1}`,
        })),
      ]}
      rows={[
        ...[...Array(30)].map((v, i) => {
          const obj = { key: `${i + 1}` };
          [...Array(20)].forEach((v, j) => {
            obj[j + 1] = `${i + 1}-${j + 1}`;
          });
          return obj;
        }),
      ]}
      width="100%"
      height="100%"
    />
  </div>,
  document.getElementById('root'),
);
