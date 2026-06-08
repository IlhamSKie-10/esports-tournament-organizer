import { Tournament, Match, BracketRound } from './types';

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    title: 'NEON CLASH CHAMPIONSHIP',
    game: 'Valorant',
    format: 'single_elimination',
    status: 'registration_open',
    teamSize: 'team',
    maxParticipants: 32,
    currentParticipants: 24,
    prizePool: '$5,000',
    startDate: '2026-05-01',
    endDate: '2026-05-03',
    registrationDeadline: '2026-04-25',
    rules: 'Standard competitive rules apply. Best of 3 matches.',
    description: 'The ultimate Valorant showdown. 32 teams compete for glory and a massive prize pool.',
    image: '',
  },
  {
    id: '2',
    title: 'MOBILE LEGENDS PRO LEAGUE',
    game: 'Mobile Legends',
    format: 'double_elimination',
    status: 'upcoming',
    teamSize: 'team',
    maxParticipants: 16,
    currentParticipants: 0,
    prizePool: '$3,000',
    startDate: '2026-05-15',
    endDate: '2026-05-17',
    registrationDeadline: '2026-05-10',
    rules: 'Draft pick mode. No hero bans from previous matches.',
    description: 'Southeast Asia\'s premier Mobile Legends tournament returns with double elimination format.',
    image: '',
  },
  {
    id: '3',
    title: 'BATTLE ROYALE INVITATIONAL',
    game: 'PUBG',
    format: 'round_robin',
    status: 'in_progress',
    teamSize: 'squad',
    maxParticipants: 64,
    currentParticipants: 64,
    prizePool: '$10,000',
    startDate: '2026-04-05',
    endDate: '2026-04-10',
    registrationDeadline: '2026-04-01',
    rules: 'TPP mode. Erangel and Miramar maps.',
    description: 'The most intense battle royale competition. 64 squads fight for survival and a $10K prize pool.',
    image: '',
  },
  {
    id: '4',
    title: 'APEX ARENA SHOWDOWN',
    game: 'Apex Legends',
    format: 'single_elimination',
    status: 'registration_open',
    teamSize: 'squad',
    maxParticipants: 20,
    currentParticipants: 14,
    prizePool: '$2,500',
    startDate: '2026-05-20',
    endDate: '2026-05-21',
    registrationDeadline: '2026-05-15',
    rules: 'Arena mode. Best of 5.',
    description: 'Fast-paced Apex Legends tournament with arena format matches.',
    image: '',
  },
  {
    id: '5',
    title: 'CS2 GLOBAL STRIKE',
    game: 'CS2',
    format: 'single_elimination',
    status: 'completed',
    teamSize: 'team',
    maxParticipants: 16,
    currentParticipants: 16,
    prizePool: '$8,000',
    startDate: '2026-03-20',
    endDate: '2026-03-23',
    registrationDeadline: '2026-03-15',
    rules: 'MR12. Competitive map pool.',
    description: 'Counter-Strike 2 championship concluded with an epic grand final.',
    image: '',
  },
  {
    id: '6',
    title: 'DOTA 2 LEGENDS CUP',
    game: 'Dota 2',
    format: 'double_elimination',
    status: 'registration_open',
    teamSize: 'team',
    maxParticipants: 8,
    currentParticipants: 5,
    prizePool: '$15,000',
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    registrationDeadline: '2026-05-25',
    rules: 'Captain\'s Mode. Best of 3, Grand Finals Best of 5.',
    description: 'The richest Dota 2 tournament on the platform. Only 8 elite teams qualify.',
    image: '',
  },
];

export function generateBracket(participants: string[]): BracketRound[] {
  const totalSlots = Math.pow(2, Math.ceil(Math.log2(participants.length)));
  const rounds = Math.log2(totalSlots);
  const paddedParticipants = [...participants];
  while (paddedParticipants.length < totalSlots) {
    paddedParticipants.push('BYE');
  }

  const bracket: BracketRound[] = [];

  // First round
  const firstRoundMatches: Match[] = [];
  for (let i = 0; i < totalSlots / 2; i++) {
    const p1 = paddedParticipants[i];
    const p2 = paddedParticipants[totalSlots - 1 - i];
    const isBye = p1 === 'BYE' || p2 === 'BYE';
    firstRoundMatches.push({
      id: `r1-m${i}`,
      round: 1,
      position: i,
      player1: p1 === 'BYE' ? null : p1,
      player2: p2 === 'BYE' ? null : p2,
      score1: isBye ? (p1 === 'BYE' ? 0 : 1) : null,
      score2: isBye ? (p2 === 'BYE' ? 0 : 1) : null,
      winner: isBye ? (p1 === 'BYE' ? p2 : p1) : null,
      status: isBye ? 'completed' : 'pending',
    });
  }
  bracket.push({ round: 1, matches: firstRoundMatches });

  // Subsequent rounds
  for (let r = 2; r <= rounds; r++) {
    const matchCount = totalSlots / Math.pow(2, r);
    const matches: Match[] = [];
    for (let i = 0; i < matchCount; i++) {
      matches.push({
        id: `r${r}-m${i}`,
        round: r,
        position: i,
        player1: null,
        player2: null,
        score1: null,
        score2: null,
        winner: null,
        status: 'pending',
      });
    }
    bracket.push({ round: r, matches });
  }

  // Advance BYE winners
  for (let r = 0; r < bracket.length - 1; r++) {
    const currentRound = bracket[r];
    const nextRound = bracket[r + 1];
    currentRound.matches.forEach((match, idx) => {
      if (match.winner) {
        const nextMatchIdx = Math.floor(idx / 2);
        const nextMatch = nextRound.matches[nextMatchIdx];
        if (idx % 2 === 0) {
          nextMatch.player1 = match.winner;
        } else {
          nextMatch.player2 = match.winner;
        }
      }
    });
  }

  return bracket;
}

export const sampleParticipants = [
  'Team Phoenix', 'Team Dragon', 'Team Storm', 'Team Shadow',
  'Team Blaze', 'Team Frost', 'Team Thunder', 'Team Venom',
  'Team Cyber', 'Team Nexus', 'Team Apex', 'Team Omega',
  'Team Nova', 'Team Pulse', 'Team Zenith', 'Team Eclipse',
];

export const sampleBracket = generateBracket(sampleParticipants);
