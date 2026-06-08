import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { mockTournaments } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function Register() {
  const { id } = useParams();
  const tournament = mockTournaments.find((t) => t.id === id);
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  if (!tournament) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-heading text-muted-foreground">Tournament not found.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: 'Registration submitted!', description: 'You have been registered for the tournament.' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-12 text-center space-y-6 max-w-md mx-4">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="font-heading text-2xl font-bold">REGISTRATION COMPLETE</h1>
            <p className="text-muted-foreground">You've been registered for <span className="text-foreground font-medium">{tournament.title}</span>.</p>
            <Button asChild className="font-heading tracking-widest text-sm">
              <Link to={`/tournament/${tournament.id}`}>VIEW TOURNAMENT</Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to={`/tournament/${tournament.id}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-heading text-sm tracking-wider">
            <ArrowLeft className="h-4 w-4" />
            BACK TO TOURNAMENT
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-neon-magenta to-neon-gold" />
              <div className="p-8 space-y-2 border-b border-border/50">
                <h1 className="font-heading text-2xl font-bold">REGISTER</h1>
                <p className="text-muted-foreground">{tournament.title}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="font-heading text-xs tracking-wider">TEAM / PLAYER NAME *</Label>
                  <Input required placeholder="Enter your team or player name" className="bg-secondary/50" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-heading text-xs tracking-wider">EMAIL *</Label>
                    <Input required type="email" placeholder="your@email.com" className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading text-xs tracking-wider">DISCORD TAG</Label>
                    <Input placeholder="username#1234" className="bg-secondary/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-xs tracking-wider">IN-GAME ID *</Label>
                  <Input required placeholder="Your in-game username or ID" className="bg-secondary/50" />
                </div>

                {tournament.teamSize !== 'solo' && (
                  <div className="space-y-2">
                    <Label className="font-heading text-xs tracking-wider">TEAM MEMBERS</Label>
                    <Textarea placeholder="List your team members (one per line)" className="bg-secondary/50 min-h-[100px]" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="font-heading text-xs tracking-wider">RANK / TIER</Label>
                  <Select>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select your rank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="challenger">Challenger / Radiant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-heading text-xs tracking-wider">ADDITIONAL NOTES</Label>
                  <Textarea placeholder="Anything else we should know?" className="bg-secondary/50" />
                </div>

                <Button type="submit" size="lg" className="w-full font-heading tracking-widest text-sm h-12">
                  <Send className="mr-2 h-4 w-4" />
                  SUBMIT REGISTRATION
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
