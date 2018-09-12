import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  render() {
    const { _onMouseOver, _onMouseLeave } = this;
    const { height, children } = this.props;
    const { isHover } = this.state;
    return (
      <div
        style={{ height, minHeight: height, display: 'flex' }}
        onMouseOver={_onMouseOver}
        onMouseLeave={_onMouseLeave}
      >
        {children(isHover)}
      </div>
    );
  }

  _onMouseOver() {
    this.setState({ isHover: true });
  }

  _onMouseLeave() {
    this.setState({ isHover: false });
  }
}

export default Row;
