import { Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <Zap className="h-3 w-3 text-neon-magenta -ml-3 -mt-3" />
            <span className="font-heading text-lg font-bold gradient-text">NEXUS</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            © 2026 Nexus Esports. Built for competitive gaming.
          </p>
        </div>
      </div>
    </footer>
  );
}
