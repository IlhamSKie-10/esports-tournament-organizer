import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { TournamentCard } from '@/components/TournamentCard';
import { Footer } from '@/components/Footer';
import { mockTournaments } from '@/lib/mock-data';
import type { TournamentStatus, GameTitle } from '@/lib/types';

const games: GameTitle[] = ['Valorant', 'Mobile Legends', 'PUBG', 'Apex Legends', 'CS2', 'Dota 2'];
const statuses: { label: string; value: TournamentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'registration_open' },
  { label: 'Live', value: 'in_progress' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
];

export default function Tournaments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | 'all'>('all');
  const [gameFilter, setGameFilter] = useState<GameTitle | 'all'>('all');

  const filtered = mockTournaments.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.game.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesGame = gameFilter === 'all' || t.game === gameFilter;
    return matchesSearch && matchesStatus && matchesGame;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">TOURNAMENTS</h1>
            <p className="text-muted-foreground">Find and join competitive esports tournaments.</p>
          </motion.div>

          {/* Filters */}
          <div className="space-y-4 mb-10">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tournaments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50 font-body"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <Button
                  key={s.value}
                  variant={statusFilter === s.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(s.value)}
                  className="font-heading text-xs tracking-wider"
                >
                  {s.label}
                </Button>
              ))}
              <div className="w-px h-8 bg-border mx-1" />
              <Button
                variant={gameFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setGameFilter('all')}
                className="font-heading text-xs tracking-wider"
              >
                All Games
              </Button>
              {games.map((g) => (
                <Button
                  key={g}
                  variant={gameFilter === g ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGameFilter(g)}
                  className="font-heading text-xs tracking-wider"
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-heading">No tournaments match your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <TournamentCard key={t.id} tournament={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
