import React from 'react';

const Table = ({ columns, rows }) => (
  <table>
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
};

export default Table;
