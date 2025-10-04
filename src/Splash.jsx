import { useState, useEffect } from 'react';

const Splash = ({ onComplete }) => {
  const [filledLetters, setFilledLetters] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoOut, setLogoOut] = useState(false);
  const text = 'BRANDLINKAR';

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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      display: 'flex',
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
        }}
        onClick={() => onComplete()}
        title="Click to skip"
      >
        <div style={{
          fontSize: '6rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textAlign: 'center',
          color: '#2c3e50',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          {text.split('').map((letter, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: filledLetters.includes(i) ? '#3498db' : '#2c3e50',
                transition: 'all 0.6s ease',
                position: 'relative',
                cursor: 'pointer',
                transform: filledLetters.includes(i) ? 'scale(1.02)' : 'scale(1)',
                textShadow: filledLetters.includes(i) ? '0 0 20px rgba(52, 152, 219, 0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                if (filledLetters.includes(i)) {
                  e.target.style.color = '#2980b9';
                  e.target.style.textShadow = '0 0 30px rgba(52, 152, 219, 0.7)';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (filledLetters.includes(i)) {
                  e.target.style.color = '#3498db';
                  e.target.style.textShadow = '0 0 20px rgba(52, 152, 219, 0.5)';
                  e.target.style.transform = 'scale(1.02)';
                }
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '1.5rem',
          color: '#7f8c8d',
          fontWeight: 300,
          opacity: logoVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}>
          Connecting Brands & Influencers
        </div>
      </div>
    </div>
  );
};

export default Splash;
