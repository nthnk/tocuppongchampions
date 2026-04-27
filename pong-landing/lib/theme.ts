// 6CUPS Brand Theme — per Design System (Foam-default, square corners, no shadows)

export const palette = {
  // Primary
  cupRed:   '#F00B1F',
  blackout: '#000000',
  foam:     '#FFFBEC',

  // Secondary (use sparingly)
  blueSolo: '#1C26E8',
  beerRun:  '#FFD939',
  lager:    '#37010B',

  // Legacy aliases (kept so older sections compile while we refactor)
  red:        '#F00B1F',
  redDark:    '#B30816',
  redLight:   '#FF3B36',
  black:      '#000000',
  darkSlate:  '#0a0808',
  slate:      '#1c1917',
  darkMaroon: '#37010B',
  cream:      '#FFFBEC',
  white:      '#FFFFFF',
  gold:       '#FFD939',
  blue:       '#1C26E8',
  gray400:    'rgba(0,0,0,0.55)',
  gray600:    'rgba(0,0,0,0.75)',
};

export const fonts = {
  heading: 'var(--font-posterama), var(--font-outfit), Arial Black, Arial, sans-serif',
  body:    'var(--font-outfit), Arial, sans-serif',
};
