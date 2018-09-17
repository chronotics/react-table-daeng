import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ marginTop, style, children, ...props }) => (
  <div
    style={{
      marginTop,
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

TableBody.defaultProps = {
  marginTop: '40px',
  style: {},
  children: null,
};

TableBody.propTypes = {
  marginTop: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default TableBody;
