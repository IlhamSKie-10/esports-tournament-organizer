import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Trophy, Gamepad2, Clock, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { mockTournaments } from '@/lib/mock-data';

const statusColors: Record<string, string> = {
  upcoming: 'bg-neon-gold/20 text-neon-gold border-neon-gold/30',
  registration_open: 'bg-primary/20 text-primary border-primary/30',
  in_progress: 'bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30',
  completed: 'bg-muted text-muted-foreground border-border',
};

export default function TournamentDetail() {
  const { id } = useParams();
  const tournament = mockTournaments.find((t) => t.id === id);

  if (!tournament) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-heading text-2xl font-bold">Tournament not found</h1>
            <Button asChild variant="outline" className="neon-border">
              <Link to="/tournaments">Back to Tournaments</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (tournament.currentParticipants / tournament.maxParticipants) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/tournaments" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider">
            <ArrowLeft className="h-4 w-4" />
            BACK TO TOURNAMENTS
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary via-neon-magenta to-neon-gold" />
              <div className="p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className={statusColors[tournament.status]}>
                    {tournament.status === 'in_progress' && <span className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse-neon mr-1.5" />}
                    {tournament.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {tournament.format.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground capitalize">
                    {tournament.teamSize}
                  </Badge>
                </div>

                <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">{tournament.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{tournament.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={Gamepad2} label="Game" value={tournament.game} color="text-primary" />
                  <StatCard icon={Trophy} label="Prize Pool" value={tournament.prizePool} color="text-neon-gold" />
                  <StatCard icon={Calendar} label="Start Date" value={new Date(tournament.startDate).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })} color="text-neon-magenta" />
                  <StatCard icon={Clock} label="Registration" value={new Date(tournament.registrationDeadline).toLocaleDateString('en', { month: 'short', day: 'numeric' })} color="text-primary" />
                </div>

                {/* Participant progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Participants
                    </span>
                    <span className="font-heading font-bold">
                      {tournament.currentParticipants} / {tournament.maxParticipants}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-neon-magenta"
                    />
                  </div>
                </div>

                {/* Actions */}
                {tournament.status === 'registration_open' && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button asChild size="lg" className="font-heading tracking-widest text-sm">
                      <Link to={`/tournament/${tournament.id}/register`}>
                        REGISTER NOW
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="neon-border font-heading tracking-widest text-sm">
                      <Link to="/bracket/demo">VIEW BRACKET</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Rules */}
            <div className="glass rounded-xl p-8 space-y-4">
              <h2 className="font-heading text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                RULES & INFORMATION
              </h2>
              <p className="text-muted-foreground leading-relaxed">{tournament.rules}</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
      <Icon className={`h-5 w-5 ${color}`} />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading font-bold text-sm">{value}</p>
    </div>
  );
}
