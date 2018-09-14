import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { height, style, children, ...props } = this.props;
    return (
      <div
        style={{ height, minHeight: height, display: 'flex', ...style }}
        onMouseOver={_onMouseOver}
        onMouseLeave={_onMouseLeave}
        {...props}
      >
        {children({ props: this.props, state: this.state })}
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

Row.defaultProps = {
  height: '30px',
  style: {},
  children: () => null,
};

Row.propTypes = {
  height: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.func,
};

export default Row;
