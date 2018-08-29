import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Table } from './components';

const Container = styled.div`
  width: 600px;
  height: 600px;
  border: 1px solid blue;
  box-sizing: border-box;
`;

class App extends Component {
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
      <Container>
        <Table
          columns={columns}
          rows={rows}
          width="100%"
          height="100%"
          onClickCell={_onClickCell}
        />
      </Container>
    );
  }

  _onClickCell({ event, type, row, col }) {
    console.log(type, row, col);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
