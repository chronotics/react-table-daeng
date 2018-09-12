import React from 'react';

const Cell = ({
  width,
  border,
  hoverBg,
  selectedBg,
  defaultBg,
  isHover,
  isSelected,
  onClick,
  onContextMenu,
  children,
}) => (
  <div
    style={{
      width,
      minWidth: width,
      backgroundColor: isHover
        ? hoverBg || '#f8f8f8'
        : isSelected
          ? selectedBg || '#eefdff'
          : defaultBg || '#ffffff',
      color: isSelected ? '#04bed6' : '#777777',
      borderTop: !border.top ? null : '1px #ebebeb solid',
      borderLeft: !border.left ? null : '1px #ebebeb solid',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      fontWeight: isSelected ? '500' : '400',
      fontSize: '12px',
    }}
    onClick={onClick}
    onContextMenu={onContextMenu}
  >
    {children}
  </div>
);

export default Cell;
