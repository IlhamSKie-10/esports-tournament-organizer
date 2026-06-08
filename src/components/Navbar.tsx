import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Brackets', href: '/bracket/demo' },
  { label: 'About', href: '#' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Trophy className="h-7 w-7 text-primary" />
            <Zap className="h-3 w-3 text-neon-magenta absolute -top-1 -right-1" />
          </div>
          <span className="font-heading text-xl font-bold gradient-text">NEXUS</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-heading text-sm font-medium tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.href ? 'neon-text' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="outline" size="sm" className="neon-border font-heading text-xs tracking-widest">
            SIGN IN
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-heading text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="outline" size="sm" className="neon-border font-heading text-xs tracking-widest w-fit">
                SIGN IN
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
