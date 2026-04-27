// 6CUPS — Toronto regions used to colour-code teams.
// Colour pairings come straight from the brand kit.

import { palette } from './theme';

export type RegionKey = 'NW' | 'NE' | 'SW' | 'SE';

export type Region = {
  key: RegionKey;
  label: string;
  bg: string;
  fg: string;
};

export const REGIONS: Record<RegionKey, Region> = {
  NW: { key: 'NW', label: 'North West', bg: palette.blueSolo, fg: palette.foam },
  NE: { key: 'NE', label: 'North East', bg: palette.cupRed,   fg: palette.blackout },
  SW: { key: 'SW', label: 'South West', bg: palette.beerRun,  fg: palette.blueSolo },
  SE: { key: 'SE', label: 'South East', bg: palette.lager,    fg: palette.beerRun },
};

// Neighbourhood → region. Mirrors the colours in the Table Zero playoff bracket.
const NEIGHBOURHOOD_REGION: Record<string, RegionKey> = {
  // North West
  'Weston': 'NW',
  'Downsview': 'NW',
  'North York/Yonge-Sheppard': 'NW',
  // North East
  'Milliken': 'NE',
  'Scarborough Town Centre': 'NE',
  'Pleasantview': 'NE',
  'East Danforth': 'NE',
  // South West
  'Long Branch': 'SW',
  // South East
  'St. Lawrence Market': 'SE',
  'Church/Wellesley': 'SE',
  'The Annex': 'SE',
  'Kensington Market': 'SE',
  'Scarborough Village': 'SE',
};

export function regionOf(neighbourhood: string): Region {
  const key = NEIGHBOURHOOD_REGION[neighbourhood] ?? 'NE';
  return REGIONS[key];
}
