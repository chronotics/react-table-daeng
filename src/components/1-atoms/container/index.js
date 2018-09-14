import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
  render() {
    const { width, height, style, children, innerRef, ...props } = this.props;
    return (
      <div
        ref={innerRef}
        style={{
          width,
          height,
          overflow: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

Container.defaultProps = {
  width: '600px',
  height: '600px',
  style: {},
  children: null,
  innerRef: () => {},
};

Container.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Container;
