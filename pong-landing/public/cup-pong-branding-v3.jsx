import React, { useState } from 'react';

const CupPongBrandingV6 = () => {
  const [selectedConcept, setSelectedConcept] = useState(0);
  
  // Athletic palette with 80% saturation red, blue, orange
  const palette = {
    // Core
    black: '#0C0C0C',
    darkSlate: '#121318',
    slate: '#1A1B21',
    
    // Primary colors - 80% saturation
    red: '#E63946',        // 80% sat red
    blue: '#3A86E6',       // 80% sat blue  
    orange: '#E68A33',     // 80% sat orange
    
    // Lighter variants
    redLight: '#EF5A67',
    blueLight: '#5C9DEF',
    orangeLight: '#EFA050',
    
    // Neutrals
    white: '#FFFFFF',
    gray100: '#F3F4F6',
    gray400: '#9CA3AF',
    gray600: '#4B5563',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: palette.darkSlate,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
      color: palette.white,
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
          
          .profile-option {
            cursor: pointer;
            transition: all 0.2s ease;
            border: 2px solid transparent;
          }
          
          .profile-option:hover {
            transform: translateY(-3px);
            border-color: ${palette.blue}50;
          }
          
          .profile-option.selected {
            border-color: ${palette.blue};
            box-shadow: 0 8px 24px ${palette.blue}30;
          }
          
          .gradient-title {
            background: linear-gradient(180deg, ${palette.red} 0%, ${palette.orange} 50%, ${palette.blue} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: palette.slate,
            padding: '6px 16px',
            borderRadius: '6px',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: palette.accent,
              borderRadius: '50%',
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: palette.gray400,
            }}>
              Brand System V6
            </span>
          </div>
          
          <h1 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '54px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
          }}>
            <span style={{ color: palette.red }}>Cup </span>
            <span style={{ color: palette.orange }}>Pong </span>
            <span style={{ color: palette.blue }}>Dudes</span>
          </h1>
          
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: palette.gray400,
            marginTop: '16px',
            fontWeight: 500,
          }}>
            Red, orange & blue palette. Curvier type. Rec sports credibility.
          </p>
        </div>

        {/* Target Audience */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '28px',
          marginBottom: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
        }}>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: palette.red,
              margin: '0 0 8px 0',
            }}>
              Target Audience
            </p>
            <p style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              color: palette.white,
              margin: 0,
            }}>
              Niche Sports Players
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: palette.orange,
              margin: '0 0 8px 0',
            }}>
              Think
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: palette.gray100,
              margin: 0,
              lineHeight: 1.5,
            }}>
              Spikeball · Ultimate Frisbee · Cornhole · Disc Golf · Kickball Leagues
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: palette.gray400,
              margin: '0 0 8px 0',
            }}>
              Vibe
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: palette.gray100,
              margin: 0,
              lineHeight: 1.5,
            }}>
              Athletic, grassroots competitive, takes the game seriously
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <h2 style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: palette.white,
              margin: 0,
            }}>
              Color System
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: palette.gray400,
              margin: 0,
            }}>
              Red, orange & blue — 80% saturation
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '12px',
          }}>
            {[
              { name: 'Black', color: palette.black },
              { name: 'Slate', color: palette.slate },
              { name: 'Red', color: palette.red, glow: true },
              { name: 'Orange', color: palette.orange, glow: true },
              { name: 'Blue', color: palette.blue, glow: true },
              { name: 'White', color: palette.white },
            ].map((swatch, i) => (
              <div key={i}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1.5',
                  background: swatch.color,
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: swatch.name === 'Black' || swatch.name === 'Slate'
                    ? `1px solid ${palette.gray600}30` 
                    : swatch.name === 'White'
                    ? `1px solid ${palette.gray400}30`
                    : 'none',
                  boxShadow: swatch.glow ? `0 4px 16px ${swatch.color}50` : 'none',
                }} />
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: palette.white,
                  margin: '0 0 2px 0',
                }}>
                  {swatch.name}
                </p>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: palette.gray400,
                  margin: 0,
                }}>
                  {swatch.color}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: palette.white,
            margin: '0 0 28px 0',
          }}>
            Typography
          </h2>
          
          <div style={{ display: 'grid', gap: '32px' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}>
                <div style={{
                  background: palette.red,
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: palette.white,
                  }}>
                    Headlines
                  </span>
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: palette.gray400,
                }}>
                  Quicksand Bold
                </span>
              </div>
              <p style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '44px',
                fontWeight: 700,
                color: palette.white,
                margin: 0,
                lineHeight: 1.1,
              }}>
                The Fall Classic 2025
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: palette.gray400,
                marginTop: '10px',
              }}>
                Rounded, friendly curves—athletic but approachable
              </p>
            </div>
            
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}>
                <div style={{
                  background: palette.orange,
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: palette.black,
                  }}>
                    Body
                  </span>
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: palette.gray400,
                }}>
                  Inter Medium
                </span>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: palette.gray100,
                margin: 0,
                lineHeight: 1.7,
                maxWidth: '600px',
              }}>
                Toronto's premier cup pong tournament is back. 64 teams compete for cash prizes 
                and citywide bragging rights. Competitive players and casual crews welcome—
                just bring your A-game.
              </p>
            </div>
            
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}>
                <div style={{
                  background: palette.darkSlate,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: `1px solid ${palette.gray600}`,
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: palette.gray100,
                  }}>
                    Data/Stats
                  </span>
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: palette.gray400,
                }}>
                  JetBrains Mono
                </span>
              </div>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '15px',
                fontWeight: 500,
                color: palette.blue,
                margin: 0,
              }}>
                SEP 2025 • 64 TEAMS • $2,000 PRIZE POOL
              </p>
            </div>
          </div>
        </div>

        {/* Profile Concepts */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <h2 style={{
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: palette.white,
              margin: 0,
            }}>
              Profile Icons
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: palette.gray400,
              margin: 0,
            }}>
              Click to preview
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}>
            {/* Concept 1: Bold CPD Badge */}
            <div 
              className={`profile-option ${selectedConcept === 0 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(0)}
              style={{
                background: palette.darkSlate,
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                margin: '0 auto 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.blue,
                boxShadow: `0 6px 24px ${palette.blue}50`,
              }}>
                <span style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '34px',
                  fontWeight: 700,
                  color: palette.white,
                }}>
                  CPD
                </span>
              </div>
              <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: palette.white,
                marginBottom: '4px',
              }}>
                Blue Badge
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: palette.gray400,
              }}>
                Bold, instant recognition
              </p>
            </div>

            {/* Concept 2: Outlined wordmark */}
            <div 
              className={`profile-option ${selectedConcept === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(1)}
              style={{
                background: palette.darkSlate,
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                margin: '0 auto 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.black,
                border: `3px solid ${palette.orange}`,
              }}>
                <span style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: palette.white,
                  lineHeight: 1.2,
                }}>
                  Cup
                </span>
                <span style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: palette.orange,
                  lineHeight: 1.2,
                }}>
                  Pong
                </span>
              </div>
              <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: palette.white,
                marginBottom: '4px',
              }}>
                Stacked Mark
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: palette.gray400,
              }}>
                More context, clean
              </p>
            </div>

            {/* Concept 3: Cup + Ball */}
            <div 
              className={`profile-option ${selectedConcept === 2 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(2)}
              style={{
                background: palette.darkSlate,
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                margin: '0 auto 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.black,
                border: `2px solid ${palette.gray600}30`,
              }}>
                <svg width="55" height="62" viewBox="0 0 55 62">
                  {/* Cup */}
                  <path
                    d="M6 2 L11 54 L44 54 L49 2 Z"
                    fill="none"
                    stroke={palette.red}
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Rim */}
                  <ellipse
                    cx="27.5"
                    cy="3"
                    rx="21.5"
                    ry="3"
                    fill="none"
                    stroke={palette.red}
                    strokeWidth="3"
                  />
                  {/* Ball */}
                  <circle cx="42" cy="18" r="9" fill={palette.blue} />
                  <circle cx="39" cy="15" r="2.5" fill={palette.white} opacity="0.4" />
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: palette.white,
                marginBottom: '4px',
              }}>
                Icon Mark
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: palette.gray400,
              }}>
                Visual, memorable
              </p>
            </div>

            {/* Concept 4: Solid purple with ball */}
            <div 
              className={`profile-option ${selectedConcept === 3 ? 'selected' : ''}`}
              onClick={() => setSelectedConcept(3)}
              style={{
                background: palette.darkSlate,
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                margin: '0 auto 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.orange,
                boxShadow: `0 6px 24px ${palette.orange}40`,
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: palette.white,
                }}>
                  CP
                </span>
                {/* Ball */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: '24px',
                  height: '24px',
                  background: palette.blue,
                  borderRadius: '50%',
                  boxShadow: `0 2px 8px ${palette.black}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: palette.white,
                    borderRadius: '50%',
                    opacity: 0.5,
                    marginTop: '-4px',
                    marginLeft: '-4px',
                  }} />
                </div>
              </div>
              <h3 style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: palette.white,
                marginBottom: '4px',
              }}>
                CP + Ball
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: palette.gray400,
              }}>
                Compact, playful detail
              </p>
            </div>
          </div>
        </div>

        {/* Social Preview */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: palette.white,
            margin: '0 0 24px 0',
          }}>
            In Context
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {/* IG Profile */}
            <div style={{
              background: palette.black,
              borderRadius: '10px',
              padding: '20px',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: palette.gray400,
                marginBottom: '14px',
              }}>
                Instagram
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '50%',
                  background: selectedConcept === 0 
                    ? palette.blue
                    : selectedConcept === 1
                    ? palette.black
                    : selectedConcept === 2
                    ? palette.black
                    : palette.orange,
                  border: selectedConcept === 1 
                    ? `2px solid ${palette.orange}`
                    : selectedConcept === 2
                    ? `2px solid ${palette.gray600}30`
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: selectedConcept === 0
                    ? `0 4px 16px ${palette.blue}40`
                    : selectedConcept === 3
                    ? `0 4px 16px ${palette.orange}40`
                    : 'none',
                  position: 'relative',
                }}>
                  {selectedConcept === 0 && (
                    <span style={{
                      fontFamily: 'Quicksand, sans-serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: palette.white,
                    }}>
                      CPD
                    </span>
                  )}
                  {selectedConcept === 1 && (
                    <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
                      <span style={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: palette.white,
                        display: 'block',
                      }}>
                        Cup
                      </span>
                      <span style={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: palette.orange,
                        display: 'block',
                      }}>
                        Pong
                      </span>
                    </div>
                  )}
                  {selectedConcept === 3 && (
                    <>
                      <span style={{
                        fontFamily: 'Quicksand, sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: palette.white,
                      }}>
                        CP
                      </span>
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        width: '14px',
                        height: '14px',
                        background: palette.blue,
                        borderRadius: '50%',
                      }} />
                    </>
                  )}
                </div>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: palette.white,
                    margin: 0,
                  }}>
                    cuppongdudes
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: palette.gray400,
                    margin: '2px 0 0 0',
                  }}>
                    Toronto Cup Pong League · 19+
                  </p>
                </div>
              </div>
            </div>

            {/* Announcement Post */}
            <div style={{
              background: palette.black,
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: palette.gray400,
                padding: '20px 20px 12px',
              }}>
                Event Post
              </p>
              <div style={{
                aspectRatio: '1',
                background: palette.darkSlate,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'relative',
              }}>
                {/* Subtle gradient bg */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 50% 30%, ${palette.red}20 0%, transparent 60%)`,
                }} />
                
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  color: palette.orange,
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  SEP 2025
                </p>
                
                <h3 style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '34px',
                  fontWeight: 700,
                  color: palette.white,
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1.15,
                  position: 'relative',
                }}>
                  The Fall
                  <br />
                  <span style={{ color: palette.red }}>Classic</span>
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '18px',
                  position: 'relative',
                }}>
                  {['64 Teams', '$2K Prizes', '19+'].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: palette.white,
                      padding: '5px 10px',
                      background: palette.slate,
                      borderRadius: '4px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: palette.gray400,
                  marginTop: '20px',
                  position: 'relative',
                }}>
                  Registration opens soon →
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Comparisons */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: palette.white,
            margin: '0 0 8px 0',
          }}>
            Reference Points
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: palette.gray400,
            margin: '0 0 24px 0',
          }}>
            Brands in the niche sports space this aligns with
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {['Spikeball', 'AUDL (Ultimate)', 'Cornhole ACL', 'WAKA Kickball', 'Disc Golf Pro Tour'].map((brand, i) => (
              <span key={i} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                color: palette.gray100,
                padding: '8px 14px',
                background: palette.darkSlate,
                borderRadius: '6px',
                border: `1px solid ${palette.gray600}30`,
              }}>
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Evolution */}
        <div style={{
          background: palette.slate,
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h2 style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '22px',
            fontWeight: 700,
            color: palette.white,
            margin: '0 0 24px 0',
          }}>
            Evolution
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '10px',
          }}>
            {[
              { v: 'V1', note: 'Too playful', color: '#E27D60', bg: '#FDF6E3' },
              { v: 'V2', note: 'Too sharp', color: '#D4AF37', bg: '#0A0A0A' },
              { v: 'V3', note: 'Warm', color: '#FF6B35', bg: '#0D0D0D' },
              { v: 'V4', note: 'Too soft', color: '#8B5CF6', bg: '#12121A' },
              { v: 'V5', note: 'Blue off', color: '#2563EB', bg: '#151619' },
            ].map((item, i) => (
              <div key={i} style={{
                background: item.bg,
                borderRadius: '8px',
                padding: '14px',
                textAlign: 'center',
                border: item.bg !== '#FDF6E3' ? `1px solid ${palette.gray600}30` : 'none',
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: palette.gray400,
                  marginBottom: '4px',
                }}>
                  {item.v}
                </p>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: item.color,
                  borderRadius: '4px',
                  margin: '0 auto 4px',
                }} />
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  color: item.bg === '#FDF6E3' ? '#999' : palette.gray400,
                  margin: 0,
                }}>
                  {item.note}
                </p>
              </div>
            ))}
            
            {/* V6 - Current */}
            <div style={{
              background: palette.black,
              borderRadius: '8px',
              padding: '14px',
              textAlign: 'center',
              border: `2px solid ${palette.blue}`,
              boxShadow: `0 4px 16px ${palette.blue}25`,
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: palette.blue,
                marginBottom: '4px',
              }}>
                V6 ✓
              </p>
              <p style={{
                fontFamily: 'Quicksand, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: palette.white,
                margin: '0 0 4px 0',
              }}>
                <span style={{ color: palette.red }}>Cup </span>
                <span style={{ color: palette.orange }}>Pong</span>
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                color: palette.gray400,
                margin: 0,
              }}>
                Red, orange, blue
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: palette.gray600,
          }}>
            QUICKSAND • INTER • JETBRAINS MONO
          </p>
        </div>
      </div>
    </div>
  );
};

export default CupPongBrandingV6;
