import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Gamepad2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Tournament } from '@/lib/types';

const statusColors: Record<string, string> = {
  upcoming: 'bg-neon-gold/20 text-neon-gold border-neon-gold/30',
  registration_open: 'bg-primary/20 text-primary border-primary/30',
  in_progress: 'bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30',
  completed: 'bg-muted text-muted-foreground border-border',
};

const statusLabels: Record<string, string> = {
  upcoming: 'UPCOMING',
  registration_open: 'OPEN',
  in_progress: 'LIVE',
  completed: 'ENDED',
};

const gameIcons: Record<string, string> = {
  'Valorant': '🎯',
  'Mobile Legends': '⚔️',
  'PUBG': '🔫',
  'Apex Legends': '🏹',
  'CS2': '💣',
  'Dota 2': '🛡️',
  'League of Legends': '⚡',
  'Fortnite': '🏗️',
};

export function TournamentCard({ tournament, index }: { tournament: Tournament; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/tournament/${tournament.id}`} className="block group">
        <div className="glass rounded-xl overflow-hidden hover-glow transition-all duration-500 group-hover:border-primary/40">
          {/* Header bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-neon-magenta to-neon-gold" />

          <div className="p-6 space-y-4">
            {/* Status + Game */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={statusColors[tournament.status]}>
                {tournament.status === 'in_progress' && (
                  <span className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse-neon mr-1.5" />
                )}
                {statusLabels[tournament.status]}
              </Badge>
              <span className="text-lg">{gameIcons[tournament.game] || '🎮'}</span>
            </div>

            {/* Title */}
            <h3 className="font-heading text-lg font-bold tracking-wide group-hover:gradient-text transition-all">
              {tournament.title}
            </h3>

            {/* Game name */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Gamepad2 className="h-4 w-4" />
              <span>{tournament.game}</span>
              <span className="text-border">•</span>
              <span className="capitalize">{tournament.format.replace('_', ' ')}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <Trophy className="h-4 w-4 mx-auto text-neon-gold mb-1" />
                <p className="text-xs text-muted-foreground">Prize</p>
                <p className="text-sm font-heading font-bold">{tournament.prizePool}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <Users className="h-4 w-4 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Slots</p>
                <p className="text-sm font-heading font-bold">
                  {tournament.currentParticipants}/{tournament.maxParticipants}
                </p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <Calendar className="h-4 w-4 mx-auto text-neon-magenta mb-1" />
                <p className="text-xs text-muted-foreground">Start</p>
                <p className="text-sm font-heading font-bold">
                  {new Date(tournament.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
