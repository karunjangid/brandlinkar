import { useState, useEffect } from 'react';

const Splash = ({ onComplete }) => {
  const [filledLetters, setFilledLetters] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoOut, setLogoOut] = useState(false);
  const text = 'MARKIZZA';

  useEffect(() => {
    // Logo in animation
    setTimeout(() => setLogoVisible(true), 200);

    // All letters visible transparent
    setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setFilledLetters(prev => [...prev, index]);
          index++;
        } else {
          clearInterval(interval);
          // Logo out animation
          setTimeout(() => {
            setLogoOut(true);
            setTimeout(() => onComplete(), 1000);
          }, 2000);
        }
      }, 300);
    }, 1000); // Delay before starting fill
    return () => {};
  }, [onComplete]);

  const isMobile = window.innerWidth <= 480;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#343b7a',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div
        style={{
          position: 'relative',
          opacity: logoVisible ? (logoOut ? 0 : 1) : 0,
          transform: logoVisible ? (logoOut ? 'translateY(-30px) scale(0.95)' : 'translateY(0) scale(1)') : 'translateY(50px) scale(0.9)',
          transition: logoVisible ? (logoOut ? 'opacity 1.5s ease-out, transform 1.5s ease-out' : 'opacity 1.5s ease-in, transform 1.5s ease-in') : 'none',
          cursor: 'pointer',
          fontSize: isMobile ? '3rem' : '6rem',
          textAlign: 'center',
          color: '#313de8ff',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
        onClick={() => onComplete()}
        title="Click to skip"
      >
        {text.split('').map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              color: filledLetters.includes(i) ? '#ffeb99' : '#ffb452',
              transition: 'all 0.6s ease',
              position: 'relative',
              cursor: 'pointer',
              transform: filledLetters.includes(i) ? 'scale(1.02)' : 'scale(1)',
              textShadow: filledLetters.includes(i) ? '0 0 20px rgba(255, 235, 153, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              if (filledLetters.includes(i)) {
                e.target.style.color = '#ffe066';
                e.target.style.textShadow = '0 0 30px rgba(255, 235, 153, 0.7)';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (filledLetters.includes(i)) {
                e.target.style.color = '#ffeb99';
                e.target.style.textShadow = '0 0 20px rgba(255, 235, 153, 0.5)';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
          >
            {letter}
          </span>
        ))}
        <div style={{
          marginTop: '1rem',
          fontSize: isMobile ? '1rem' : '1.5rem',
          color: '#ffb452',
          fontWeight: 300,
          opacity: logoVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}>
          Digital Marketing Agency that Elevates Your Brand
        </div>
      </div>
    </div>
  );
};

export default Splash;
