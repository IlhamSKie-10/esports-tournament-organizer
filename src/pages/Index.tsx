import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Swords, BarChart3, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { TournamentCard } from '@/components/TournamentCard';
import { Footer } from '@/components/Footer';
import { mockTournaments } from '@/lib/mock-data';

const features = [
  {
    icon: Swords,
    title: 'Dynamic Brackets',
    description: 'Auto-generated single & double elimination brackets with real-time score updates.',
    color: 'text-primary',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Support for solo, duo, squad, and full team registrations across all game titles.',
    color: 'text-neon-magenta',
  },
  {
    icon: BarChart3,
    title: 'Custom Forms',
    description: 'Build tailored registration forms with conditional logic and file uploads.',
    color: 'text-neon-gold',
  },
  {
    icon: Shield,
    title: 'Admin Control',
    description: 'Full tournament lifecycle management with role-based access and analytics.',
    color: 'text-primary',
  },
];

export default function Index() {
  const featured = mockTournaments.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-neon-magenta/5 blur-[100px]" />

        <div className="container mx-auto px-4 py-24 md:py-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-primary animate-pulse-neon" />
              <span className="text-muted-foreground font-heading tracking-wider text-xs">
                NEXT-GEN TOURNAMENT PLATFORM
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
              <span className="block">COMPETE.</span>
              <span className="block gradient-text">CONQUER.</span>
              <span className="block gradient-text-accent">DOMINATE.</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The ultimate esports tournament platform. Create brackets, manage registrations, and run
              professional competitions — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="font-heading tracking-widest text-sm px-8 h-12">
                <Link to="/tournaments">
                  BROWSE TOURNAMENTS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="neon-border font-heading tracking-widest text-sm px-8 h-12">
                <Link to="/bracket/demo">VIEW DEMO BRACKET</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">BUILT FOR ESPORTS</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Everything you need to run professional-grade tournaments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 space-y-4 hover-glow group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feat.icon className={`h-6 w-6 ${feat.color}`} />
                </div>
                <h3 className="font-heading font-bold tracking-wide">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">FEATURED TOURNAMENTS</h2>
              <p className="text-muted-foreground">Join the competition or spectate live matches.</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex neon-border font-heading text-xs tracking-widest">
              <Link to="/tournaments">VIEW ALL</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <TournamentCard key={t.id} tournament={t} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="neon-border font-heading text-xs tracking-widest">
              <Link to="/tournaments">VIEW ALL TOURNAMENTS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neon-magenta/5" />
            <div className="relative z-10 space-y-6">
              <Trophy className="h-12 w-12 text-primary mx-auto" />
              <h2 className="font-heading text-3xl md:text-5xl font-bold">
                READY TO <span className="gradient-text">COMPETE?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                Create your tournament or join an existing one. The arena awaits.
              </p>
              <Button size="lg" className="font-heading tracking-widest text-sm px-10 h-12">
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
