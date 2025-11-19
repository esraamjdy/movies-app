import React, { ReactNode } from 'react';

interface FilterButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ children, isActive, onClick }) => {
 
  const baseStyle: React.CSSProperties = {
    padding: 'clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 12px)',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    backgroundColor: isActive ? '#667eea' : '#2c3138', 
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: isActive ? '0 2px 5px rgba(102, 126, 234, 0.4)' : 'none',
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: isActive ? '#5a67d8' : '#495057', 
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  };
  
  const [currentStyle, setCurrentStyle] = React.useState(baseStyle);

  React.useEffect(() => {
    setCurrentStyle(baseStyle);
  }, [isActive]); 

  const handleMouseEnter = () => setCurrentStyle({ ...baseStyle, ...hoverStyle });
  const handleMouseLeave = () => setCurrentStyle(baseStyle);

  return (
    <button
      onClick={onClick}
      style={currentStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};