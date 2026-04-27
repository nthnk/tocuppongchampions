// 6CUPS — Event canon. Add new editions here as they happen.

export type Match = {
  a: { name: string; neighbourhood?: string; score?: number };
  b: { name: string; neighbourhood?: string; score?: number };
  winner: 0 | 1;
};

export type BracketRound = {
  label: string;
  matches: Match[];
};

export type Standing = {
  rank: number;
  team: string;
  members: string;
  neighbourhood: string;
  result: string; // e.g. 'Champion', 'Runner-up', 'Semifinalist'
};

export type EventCanon = {
  slug: string;
  number: string;
  name: string;
  status: 'Wrapped' | 'Upcoming' | 'In Progress';
  date: string;
  shortDate: string;
  location: string;
  venue: string;
  address: string;
  cover: string;
  summary: string;
  recap: string[];
  stats: { value: string; label: string }[];
  photos: { src: string; tag?: string; caption?: string }[];
  standings: Standing[];
  bracket: BracketRound[];
  champion: { team: string; members: string; neighbourhood: string };
  runnerUp: { team: string; members?: string; neighbourhood: string };
};

export const EVENTS: EventCanon[] = [
  {
    slug: 'table-zero',
    number: '1',
    name: 'Table Zero',
    status: 'Wrapped',
    date: 'March 22, 2026',
    shortDate: 'Mar 22 / 2026',
    location: 'Toronto',
    venue: 'Samara Brewing Co. / Nickel 9 Distillery',
    address: '90 Cawthra Ave Unit 101, Toronto, ON M6N 3C2',
    cover: '/event_photos/tz-05.jpg',
    summary:
      '16 teams. 4 hours. The first 6CUPS event, played out on a Saturday afternoon at Nickel 9.',
    recap: [
      'Sixteen teams. Round robin to seed, single elim through the Round of 16 and Quarter Finals, best-of-three from the Semis on.',
      'Solo Dolo took it 2–0 over The Watchmen in the final. Packed room, last cup pending.',
    ],
    stats: [
      { value: '16', label: 'Teams Played' },
      { value: '48', label: 'Matches Run' },
      { value: '4 HRS', label: 'Floor Time' },
    ],
    photos: [
      { src: '/event_photos/winners_1.jpg' },
      { src: '/event_photos/winners_2.jpg' },
      { src: '/event_photos/winners_3.jpg' },
      { src: '/event_photos/winners_4.jpg' },
      { src: '/event_photos/winners_5.jpg' },
      { src: '/event_photos/tz-09.jpg' },
      { src: '/event_photos/tz-10.jpg' },
      { src: '/event_photos/tz-05.jpg' },
      { src: '/event_photos/tz-06.jpg' },
      { src: '/event_photos/tz-07.jpg' },
      { src: '/event_photos/tz-08.jpg' },
      { src: '/event_photos/tz-04.jpg' },
      { src: '/event_photos/tz-03.jpg' },
      { src: '/event_photos/tz-02.jpg' },
      { src: '/event_photos/tz-01.jpg' },
      { src: '/event_photos/tz-11.jpg' },
      { src: '/event_photos/tz-12.jpg' },
      { src: '/event_photos/tz-13.jpg' },
      { src: '/event_photos/tz-14.jpg' },
      { src: '/event_photos/tz-15.jpg' },
      { src: '/event_photos/team_1.jpg' },
      { src: '/event_photos/team_2.jpg' },
      { src: '/event_photos/dj_1.jpg' },
      { src: '/event_photos/dj_2.jpg' },
      { src: '/event_photos/_dsf0476.jpg' },
      { src: '/event_photos/_dsf0509.jpg' },
      { src: '/event_photos/_dsf0573.jpg' },
      { src: '/event_photos/_dsf0633.jpg' },
      { src: '/event_photos/_dsf0702.jpg' },
      { src: '/event_photos/_dsf0784.jpg' },
    ],
    standings: [
      { rank: 1, team: 'Solo Dolo',           members: 'Harrison K. & Tony Q.',    neighbourhood: 'North York/Yonge-Sheppard', result: 'Champion' },
      { rank: 2, team: 'The Watchmen',        members: 'Dwight H. & Jaquan C.',    neighbourhood: 'Weston',                    result: 'Runner-Up' },
      { rank: 3, team: 'Nathan Fill-Ups',     members: 'Lindsay L. & Tony L.',     neighbourhood: 'Kensington Market',         result: 'Semifinalist' },
      { rank: 3, team: 'The Pong Stars',      members: 'Jenny G. & Frederich D.',  neighbourhood: 'Pleasantview',              result: 'Semifinalist' },
      { rank: 5, team: "Alpha's Shawarma",    members: 'Raymond S. & Madeline K.', neighbourhood: 'Milliken',                   result: 'Quarterfinalist' },
      { rank: 5, team: 'The Cup-Tains',       members: 'Yashwanth I. & Sai P.',    neighbourhood: 'St. Lawrence Market',       result: 'Quarterfinalist' },
      { rank: 5, team: 'Scarborough Dawgs',   members: 'Abhishek G. & Nathan K.',  neighbourhood: 'Milliken',                   result: 'Quarterfinalist' },
      { rank: 5, team: 'Pong Stars',          members: 'Gregory U. & Anil O.',     neighbourhood: 'Scarborough Village',       result: 'Quarterfinalist' },
      { rank: 9, team: 'No Fast No Furious',  members: 'Chris K. & Joshua M.',     neighbourhood: 'Scarborough Town Centre',                       result: 'Round of 16' },
      { rank: 9, team: "Dean's List",         members: 'Shrey P. & Lance G.',      neighbourhood: 'Downsview',                 result: 'Round of 16' },
      { rank: 9, team: 'Dino Thunder',        members: 'Niketh M. & Satya M.',     neighbourhood: 'Long Branch',               result: 'Round of 16' },
      { rank: 9, team: 'Delhi Daredevils',    members: 'Shaurya G. & Ayush M.',    neighbourhood: 'Church/Wellesley',          result: 'Round of 16' },
      { rank: 9, team: 'Nikhil & Vikash',     members: 'Nikhil S. & Vikash G.',    neighbourhood: 'East Danforth',                    result: 'Round of 16' },
      { rank: 9, team: 'Asian Guy Is Single', members: 'Damian P. & Teng T.',      neighbourhood: 'Milliken',                   result: 'Round of 16' },
      { rank: 9, team: 'Jedz Boyz',           members: 'Parsa M. & Jordan M.',     neighbourhood: 'The Annex',                 result: 'Round of 16' },
      { rank: 9, team: "The Mayor's Office",  members: 'Chris D. & Ralph',         neighbourhood: 'North York/Yonge-Sheppard', result: 'Round of 16' },
    ],
    bracket: [
      {
        label: 'Round of 16',
        matches: [
          { winner: 0, a: { name: "Alpha's Shawarma", neighbourhood: 'Milliken' },           b: { name: 'No Fast No Furious', neighbourhood: 'Scarborough Town Centre' } },
          { winner: 1, a: { name: "Dean's List",      neighbourhood: 'Downsview' },         b: { name: 'The Watchmen',       neighbourhood: 'Weston' } },
          { winner: 0, a: { name: 'The Pong Stars',   neighbourhood: 'Pleasantview' },      b: { name: 'Dino Thunder',       neighbourhood: 'Long Branch' } },
          { winner: 0, a: { name: 'The Cup-Tains',    neighbourhood: 'St. Lawrence Market' },b: { name: 'Delhi Daredevils',  neighbourhood: 'Church/Wellesley' } },
          { winner: 0, a: { name: 'Solo Dolo',        neighbourhood: 'North York/Yonge-Sheppard' }, b: { name: 'Nikhil & Vikash', neighbourhood: 'East Danforth' } },
          { winner: 0, a: { name: 'Scarborough Dawgs',neighbourhood: 'Milliken' },           b: { name: 'Asian Guy Is Single',neighbourhood: 'Milliken' } },
          { winner: 1, a: { name: 'Jedz Boyz',        neighbourhood: 'The Annex' },         b: { name: 'Pong Stars',         neighbourhood: 'Scarborough Village' } },
          { winner: 0, a: { name: 'Nathan Fill-Ups',  neighbourhood: 'Kensington Market' }, b: { name: "The Mayor's Office", neighbourhood: 'North York/Yonge-Sheppard' } },
        ],
      },
      {
        label: 'Quarter Finals',
        matches: [
          { winner: 1, a: { name: "Alpha's Shawarma", neighbourhood: 'Milliken' },           b: { name: 'The Watchmen',       neighbourhood: 'Weston' } },
          { winner: 1, a: { name: 'The Pong Stars',   neighbourhood: 'Pleasantview' },      b: { name: 'The Cup-Tains',      neighbourhood: 'St. Lawrence Market' } },
          { winner: 0, a: { name: 'Solo Dolo',        neighbourhood: 'North York/Yonge-Sheppard' }, b: { name: 'Scarborough Dawgs', neighbourhood: 'Milliken' } },
          { winner: 1, a: { name: 'Pong Stars',       neighbourhood: 'Scarborough Village' },b: { name: 'Nathan Fill-Ups',    neighbourhood: 'Kensington Market' } },
        ],
      },
      {
        label: 'Semi Finals',
        matches: [
          { winner: 0, a: { name: 'The Watchmen', neighbourhood: 'Weston',                    score: 2 }, b: { name: 'The Pong Stars',  neighbourhood: 'Pleasantview',     score: 1 } },
          { winner: 0, a: { name: 'Solo Dolo',    neighbourhood: 'North York/Yonge-Sheppard', score: 2 }, b: { name: 'Nathan Fill-Ups',neighbourhood: 'Kensington Market', score: 1 } },
        ],
      },
      {
        label: 'Final',
        matches: [
          { winner: 1, a: { name: 'The Watchmen', neighbourhood: 'Weston', score: 0 }, b: { name: 'Solo Dolo', neighbourhood: 'North York/Yonge-Sheppard', score: 2 } },
        ],
      },
    ],
    champion: { team: 'Solo Dolo',    members: 'Harrison K. & Tony Q.',  neighbourhood: 'North York/Yonge-Sheppard' },
    runnerUp: { team: 'The Watchmen', members: 'Dwight H. & Jaquan C.',  neighbourhood: 'Weston' },
  },
];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);
