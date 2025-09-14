import React from 'react'
import Image from 'next/image'

export const Header = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'hidden' }}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.2)), url(${'assets/headerImage.jpg'})`,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    bottom: '0px',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    objectFit: 'cover'

                }}>
            </div>
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '6%',
                color: 'white',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '5px'
            }}>
                <h1 style={{ fontSize: '10rem', fontWeight: 'bold', margin: '0', fontFamily: 'FONTSPRING DEMO - Caros BoldArial, sans-serif' }}>
                    MOVITA
                </h1>
                <p style={{ fontSize: '5rem', marginTop: '1rem' }}>
                    Your ultimate movie destination
                </p>
            </div>

        </div >
    )
}
