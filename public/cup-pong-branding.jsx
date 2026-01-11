import React, { useState } from 'react';

const CupPongBranding = () => {
  const [selectedConcept, setSelectedConcept] = useState(0);
  
  const palette = {
    sunset: '#E8A87C',
    coral: '#E27D60',
    dustyRose: '#C38D9E',
    sage: '#85DCBA',
    cream: '#FDF6E3',
    warmWhite: '#FFFBF7',
    deepTeal: '#41B3A3',
    charcoal: '#2D3436',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${palette.warmWhite} 0%, ${palette.cream} 100%)`,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
    }}>
      {/* Google Font Import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=DM+Sans:wght@400;500;700&display=swap');
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-12px) scale(1.1); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .profile-option {
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .profile-option:hover {
            transform: scale(1.05);
          }
          
          .profile-option.selected {
            box-shadow: 0 0 0 4px ${palette.deepTeal};
          }
        `}
      </style>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '48px',
            color: palette.coral,
            marginBottom: '10px',
            textShadow: `3px 3px 0 ${palette.sunset}`,
          }}>
            Cup Pong Dudes
          </h1>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '18px',
            color: palette.charcoal,
            opacity: 0.7,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Brand Identity Concepts
          </p>
        </div>

        {/* Color Palette Section */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '28px',
            color: palette.charcoal,
            marginBottom: '30px',
          }}>
            Retro Pastel Palette
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
          }}>
            {[
              { name: 'Sunset', color: palette.sunset },
              { name: 'Coral', color: palette.coral },
              { name: 'Dusty Rose', color: palette.dustyRose },
              { name: 'Sage', color: palette.sage },
              { name: 'Deep Teal', color: palette.deepTeal },
              { name: 'Cream', color: palette.cream },
            ].map((swatch, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: swatch.color,
                  borderRadius: '16px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  border: swatch.name === 'Cream' ? '2px solid #eee' : 'none',
                }} />
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: palette.charcoal,
                  margin: 0,
                }}>
                  {swatch.name}
                </p>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: palette.charcoal,
                  opacity: 0.5,
                  margin: '4px 0 0 0',
                }}>
                  {swatch.color}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Picture Concepts */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '28px',
            color: palette.charcoal,
            marginBottom: '10px',
          }}>
            Profile Picture Concepts
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: palette.charcoal,
            opacity: 0.6,
            marginBottom: '30px',
          }}>
            Click to select • Optimized for 110×110px display
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
          }}>
            {/* Concept 1: Minimal Cup + Ball Arc */}
            <div 
              className={`profile-option ${selectedConcept === 0 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(0)}
              style={{
                background: palette.cream,
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${palette.coral} 0%, ${palette.sunset} 100%)`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(226, 125, 96, 0.4)',
              }}>
                {/* Cup */}
                <svg width="70" height="80" viewBox="0 0 70 80" style={{ marginTop: '10px' }}>
                  <path
                    d="M10 10 L15 70 L55 70 L60 10 Z"
                    fill={palette.cream}
                    stroke="none"
                  />
                  <ellipse cx="35" cy="10" rx="25" ry="6" fill={palette.warmWhite} />
                  {/* CN Tower silhouette inside cup */}
                  <path
                    d="M33 25 L33 55 L30 55 L30 45 L28 45 L32 35 L32 25 Z
                       M37 25 L37 55 L40 55 L40 45 L42 45 L38 35 L38 25 Z
                       M32 25 L35 15 L38 25 Z"
                    fill={palette.coral}
                    opacity="0.6"
                  />
                </svg>
                {/* Ball with arc */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '20px',
                  width: '22px',
                  height: '22px',
                  background: palette.sage,
                  borderRadius: '50%',
                  animation: 'bounce 2s ease-in-out infinite',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }} />
                {/* Arc line */}
                <svg style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  width: '50px',
                  height: '50px',
                }}>
                  <path
                    d="M 40 35 Q 25 5, 10 40"
                    stroke={palette.cream}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '18px',
                color: palette.charcoal,
                marginBottom: '8px',
              }}>
                Tower Cup
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: palette.charcoal,
                opacity: 0.6,
              }}>
                CN Tower silhouette in cup
              </p>
            </div>

            {/* Concept 2: CPD Monogram */}
            <div 
              className={`profile-option ${selectedConcept === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(1)}
              style={{
                background: palette.cream,
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${palette.dustyRose} 0%, ${palette.coral} 100%)`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(195, 141, 158, 0.4)',
              }}>
                <span style={{
                  fontFamily: 'Pacifico, cursive',
                  fontSize: '52px',
                  color: palette.cream,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '-2px',
                }}>
                  CPD
                </span>
                {/* Ball accent */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '18px',
                  width: '24px',
                  height: '24px',
                  background: palette.sage,
                  borderRadius: '50%',
                  animation: 'float 3s ease-in-out infinite',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }} />
              </div>
              <h3 style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '18px',
                color: palette.charcoal,
                marginBottom: '8px',
              }}>
                CPD Script
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: palette.charcoal,
                opacity: 0.6,
              }}>
                Pacifico monogram + ball
              </p>
            </div>

            {/* Concept 3: Ball Only with Motion Trail */}
            <div 
              className={`profile-option ${selectedConcept === 2 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(2)}
              style={{
                background: palette.cream,
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${palette.sage} 0%, ${palette.deepTeal} 100%)`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(65, 179, 163, 0.4)',
              }}>
                {/* Motion trail arcs */}
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <path
                    d="M 20 70 Q 50 10, 80 70"
                    stroke={palette.cream}
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M 25 70 Q 50 20, 75 70"
                    stroke={palette.cream}
                    strokeWidth="3"
                    fill="none"
                    opacity="0.5"
                  />
                  <path
                    d="M 30 70 Q 50 30, 70 70"
                    stroke={palette.cream}
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                  />
                  {/* Ball */}
                  <circle
                    cx="50"
                    cy="35"
                    r="18"
                    fill={palette.sunset}
                  />
                  <circle
                    cx="45"
                    cy="30"
                    r="5"
                    fill={palette.cream}
                    opacity="0.4"
                  />
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '18px',
                color: palette.charcoal,
                marginBottom: '8px',
              }}>
                Arc Motion
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: palette.charcoal,
                opacity: 0.6,
              }}>
                Ball in flight, minimal mark
              </p>
            </div>

            {/* Concept 4: Geometric Cup Badge */}
            <div 
              className={`profile-option ${selectedConcept === 3 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(3)}
              style={{
                background: palette.cream,
                borderRadius: '20px',
                padding: '30px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: palette.charcoal,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 8px 30px rgba(45, 52, 54, 0.4)',
              }}>
                {/* Geometric cup */}
                <svg width="80" height="90" viewBox="0 0 80 90">
                  {/* Cup outline */}
                  <path
                    d="M15 15 L20 75 L60 75 L65 15 Z"
                    fill="none"
                    stroke={palette.sunset}
                    strokeWidth="4"
                  />
                  {/* Top ellipse */}
                  <ellipse
                    cx="40"
                    cy="15"
                    rx="25"
                    ry="7"
                    fill="none"
                    stroke={palette.sunset}
                    strokeWidth="4"
                  />
                  {/* Ball */}
                  <circle
                    cx="58"
                    cy="28"
                    r="12"
                    fill={palette.sage}
                  />
                  {/* Shine */}
                  <circle
                    cx="54"
                    cy="24"
                    r="3"
                    fill={palette.cream}
                    opacity="0.5"
                  />
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '18px',
                color: palette.charcoal,
                marginBottom: '8px',
              }}>
                Line Badge
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: palette.charcoal,
                opacity: 0.6,
              }}>
                Dark mode, geometric style
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '28px',
            color: palette.charcoal,
            marginBottom: '30px',
          }}>
            Social Preview
          </h2>
          
          {/* Instagram Mock */}
          <div style={{
            background: '#fafafa',
            borderRadius: '16px',
            padding: '20px',
            maxWidth: '400px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '15px',
            }}>
              {/* Selected profile pic at small size */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: selectedConcept === 0 
                  ? `linear-gradient(135deg, ${palette.coral} 0%, ${palette.sunset} 100%)`
                  : selectedConcept === 1
                  ? `linear-gradient(135deg, ${palette.dustyRose} 0%, ${palette.coral} 100%)`
                  : selectedConcept === 2
                  ? `linear-gradient(135deg, ${palette.sage} 0%, ${palette.deepTeal} 100%)`
                  : palette.charcoal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '2px solid',
                borderImage: `linear-gradient(45deg, ${palette.coral}, ${palette.dustyRose}, ${palette.sunset}) 1`,
                borderRadius: '50%',
                borderColor: palette.coral,
              }}>
                {selectedConcept === 1 && (
                  <span style={{
                    fontFamily: 'Pacifico, cursive',
                    fontSize: '16px',
                    color: palette.cream,
                  }}>
                    CPD
                  </span>
                )}
              </div>
              <div>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: palette.charcoal,
                  margin: 0,
                }}>
                  cuppongdudes
                </p>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: palette.charcoal,
                  opacity: 0.5,
                  margin: 0,
                }}>
                  Toronto, Ontario
                </p>
              </div>
            </div>
            
            {/* Post preview */}
            <div style={{
              background: `linear-gradient(135deg, ${palette.coral} 0%, ${palette.dustyRose} 50%, ${palette.sunset} 100%)`,
              aspectRatio: '1',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}>
              <span style={{
                fontFamily: 'Pacifico, cursive',
                fontSize: '32px',
                color: palette.cream,
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                The Fall Classic
              </span>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: palette.cream,
                marginTop: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: 0.9,
              }}>
                September 2025
              </span>
            </div>
          </div>
        </div>

        {/* Typography Reference */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '30px',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: palette.charcoal,
            opacity: 0.5,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Primary: Pacifico • Secondary: DM Sans
          </p>
        </div>
      </div>
    </div>
  );
};

export default CupPongBranding;
