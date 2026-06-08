import { motion } from 'framer-motion';
import type { BracketRound, Match } from '@/lib/types';

function MatchCard({ match, roundIndex }: { match: Match; roundIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: roundIndex * 0.15 + match.position * 0.05 }}
      className="glass rounded-lg overflow-hidden w-52 shrink-0"
    >
      <div className="h-0.5 bg-gradient-to-r from-primary to-neon-magenta" />
      <div className="divide-y divide-border/50">
        <PlayerSlot
          name={match.player1}
          score={match.score1}
          isWinner={match.winner === match.player1 && match.winner !== null}
        />
        <PlayerSlot
          name={match.player2}
          score={match.score2}
          isWinner={match.winner === match.player2 && match.winner !== null}
        />
      </div>
    </motion.div>
  );
}

function PlayerSlot({ name, score, isWinner }: { name: string | null; score: number | null; isWinner: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
        isWinner ? 'bg-primary/10' : ''
      }`}
    >
      <span
        className={`font-heading text-xs tracking-wide truncate max-w-[140px] ${
          isWinner ? 'text-primary font-bold' : name ? 'text-foreground' : 'text-muted-foreground/40'
        }`}
      >
        {name || 'TBD'}
      </span>
      {score !== null && (
        <span className={`font-heading text-xs font-bold ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
          {score}
        </span>
      )}
    </div>
  );
}

const roundLabels = ['Round 1', 'Quarterfinals', 'Semifinals', 'Grand Final'];

function getRoundLabel(round: number, totalRounds: number) {
  if (round === totalRounds) return 'Grand Final';
  if (round === totalRounds - 1) return 'Semifinals';
  if (round === totalRounds - 2) return 'Quarterfinals';
  return `Round ${round}`;
}

export function BracketViewer({ bracket }: { bracket: BracketRound[] }) {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-8 min-w-max items-start px-4">
        {bracket.map((round, roundIdx) => (
          <div key={round.round} className="flex flex-col items-center gap-2">
            <div className="font-heading text-xs tracking-widest text-muted-foreground uppercase mb-4">
              {getRoundLabel(round.round, bracket.length)}
            </div>
            <div
              className="flex flex-col gap-4 justify-around"
              style={{ minHeight: round.round === 1 ? 'auto' : `${bracket[0].matches.length * 76}px` }}
            >
              {round.matches.map((match) => (
                <MatchCard key={match.id} match={match} roundIndex={roundIdx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
