import { motion } from 'framer-motion';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BracketViewer } from '@/components/BracketViewer';
import { sampleBracket } from '@/lib/mock-data';

export default function BracketPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/tournaments" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider">
            <ArrowLeft className="h-4 w-4" />
            BACK
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center gap-4">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">TOURNAMENT BRACKET</h1>
                <p className="text-muted-foreground">Single Elimination — 16 Teams</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8">
              <BracketViewer bracket={sampleBracket} />
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                This is a demo bracket. Connect a database to manage real tournaments.
              </p>
              <Button asChild variant="outline" className="neon-border font-heading text-xs tracking-widest">
                <Link to="/tournaments">EXPLORE TOURNAMENTS</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
