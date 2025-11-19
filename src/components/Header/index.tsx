import React from 'react';

const PRIMARY_DARK_COLOR = '#121212'; 

export const Header = () => {
    return (
        <header style={{ 
            position: 'relative', 
            width: '100%', 
            height: '60vh',
            minHeight: '300px',
            overflow: 'hidden', 
            backgroundColor: PRIMARY_DARK_COLOR 
        }}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, ${PRIMARY_DARK_COLOR} 0%, rgba(18, 18, 18, 0.4) 50%, ${PRIMARY_DARK_COLOR} 100%), url('/assets/headerImage.jpg')`,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}>
            </div>
            
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                padding: '2rem',
                width: '90%',
                maxWidth: '1200px',
            }}>
                <h1 style={{ 
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    fontWeight: '800',
                    margin: '0', 
                    letterSpacing: 'clamp(2px, 1vw, 5px)',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.2',
                }}>
                    M O V I T A
                </h1>
                <p style={{ 
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    marginTop: '0.8rem',
                    color: '#E0E0E0'
                }}>
                    Your ultimate movie destination
                </p>
            </div>
        </header>
    );
}