import React from 'react';

const Table = ({ columns, rows, width, height }) => (
  <table style={{ width, height }}>
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.key}>{col.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr key={row.key}>
          {columns.map(col => (
            <td key={col.key}>{row[col.dataIndex]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.defaultProps = {
  columns: [],
  rows: [],
  width: '100%',
  height: '100%',
};

export default Table;
