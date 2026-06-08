export type GameTitle = 'Mobile Legends' | 'PUBG' | 'Valorant' | 'League of Legends' | 'Dota 2' | 'CS2' | 'Apex Legends' | 'Fortnite';

export type TournamentFormat = 'single_elimination' | 'double_elimination' | 'round_robin';
export type TournamentStatus = 'upcoming' | 'registration_open' | 'in_progress' | 'completed';
export type TeamSize = 'solo' | 'duo' | 'squad' | 'team';

export interface Tournament {
  id: string;
  title: string;
  game: GameTitle;
  format: TournamentFormat;
  status: TournamentStatus;
  teamSize: TeamSize;
  maxParticipants: number;
  currentParticipants: number;
  prizePool: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  rules: string;
  description: string;
  image: string;
}

export interface Match {
  id: string;
  round: number;
  position: number;
  player1: string | null;
  player2: string | null;
  score1: number | null;
  score2: number | null;
  winner: string | null;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface BracketRound {
  round: number;
  matches: Match[];
}

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'dropdown' | 'checkbox' | 'radio' | 'file' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}
