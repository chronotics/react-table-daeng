import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({
  width,
  borderTop,
  borderLeft,
  hoverBg,
  selectedBg,
  defaultBg,
  selectedColor,
  defaultColor,
  style,
  isHover,
  isSelected,
  onClick,
  onContextMenu,
  children,
  ...props
}) => (
  <div
    style={{
      width,
      minWidth: width,
      backgroundColor: isHover ? hoverBg : isSelected ? selectedBg : defaultBg,
      color: isSelected ? selectedColor : defaultColor,
      borderTop,
      borderLeft,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      fontWeight: isSelected ? '500' : '400',
      fontSize: '12px',
      ...style,
    }}
    onClick={onClick}
    onContextMenu={onContextMenu}
    {...props}
  >
    {children}
  </div>
);

Cell.defaultProps = {
  width: '100px',
  borderTop: '1px #ebebeb solid',
  borderLeft: '1px #ebebeb solid',
  hoverBg: '#f8f8f8',
  selectedBg: '#eefdff',
  defaultBg: '#ffffff',
  selectedColor: '#04bed6',
  defaultColor: '#777777',
  style: {},
  isHover: false,
  isSelected: false,
  onClick: () => {},
  onContextMenu: () => {},
  children: null,
};

Cell.propTypes = {
  width: PropTypes.string,
  borderTop: PropTypes.string,
  borderLeft: PropTypes.string,
  hoverBg: PropTypes.string,
  selectedBg: PropTypes.string,
  defaultBg: PropTypes.string,
  selectedColor: PropTypes.string,
  defaultColor: PropTypes.string,
  style: PropTypes.object,
  isHover: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  children: PropTypes.node,
};

export default Cell;
