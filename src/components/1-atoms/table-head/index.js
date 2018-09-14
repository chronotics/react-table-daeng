import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHead extends Component {
  render() {
    const { height, style, children, innerRef, ...props } = this.props;
    return (
      <div
        ref={innerRef}
        style={{
          height,
          position: 'absolute',
          widht: '100%',
          display: 'flex',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

TableHead.defaultProps = {
  height: '40px',
  style: {},
  children: null,
  innerRef: () => {},
};

TableHead.propTypes = {
  height: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableHead;
