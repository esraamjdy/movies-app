import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  
  const BASE_STYLE: React.CSSProperties = {
    padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)', 
    color: 'white',
    border: 'none',
    borderRadius: '30px', 
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 8px 15px rgba(102, 126, 234, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', 
    opacity: disabled ? 0.6 : 1,
    userSelect: 'none',
    transform: 'translateY(0)',
  };

  const HOVER_EFFECT: React.CSSProperties = {
    boxShadow: '0 12px 20px rgba(102, 126, 234, 0.6)', 
    transform: 'translateY(-2px)',
  };

  const ACTIVE_EFFECT: React.CSSProperties = {
    transform: 'translateY(1px)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  };


  const [currentStyle, setCurrentStyle] = React.useState(BASE_STYLE);

  const handleMouseEnter = () => {
    if (!disabled) {
      setCurrentStyle({ ...BASE_STYLE, ...HOVER_EFFECT });
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setCurrentStyle(BASE_STYLE);
    }
  };

 
  const handleMouseDown = () => {
    if (!disabled) {
        setCurrentStyle(prevStyle => ({ ...prevStyle, ...ACTIVE_EFFECT }));
    }
  };
  
  const handleMouseUp = () => {
    if (!disabled) {
        setCurrentStyle({ ...BASE_STYLE, ...HOVER_EFFECT });
    }
  };
  React.useEffect(() => {
    setCurrentStyle(BASE_STYLE);
  }, [disabled]);


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={currentStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
};