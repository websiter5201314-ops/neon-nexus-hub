import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { User, Eye, Gamepad2, Trophy, Target, Flame } from 'lucide-react';
import avatarImage from '@/assets/avatar.png';

const PlayerProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: User, label: 'Subscribers', value: 7000, suffix: '+', color: 'primary' },
    { icon: Eye, label: 'Total Views', value: 500, suffix: 'K+', color: 'secondary' },
    { icon: Gamepad2, label: 'Top Game', value: 'Free Fire', suffix: '', color: 'accent' },
    { icon: Trophy, label: 'Rank', value: 'Heroic', suffix: '', color: 'primary' },
  ];

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
          <span className="text-foreground">PLAYER </span>
          <span className="text-primary text-glow-cyan">PROFILE</span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Avatar section */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: '110%', height: '110%', top: '-5%', left: '-5%' }}
              />
              
              {/* Outer glow ring */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-br from-primary via-accent to-secondary animate-spin-slow">
                <div className="w-full h-full rounded-full bg-background p-2">
                  {/* Avatar placeholder */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-muted to-card flex items-center justify-center overflow-hidden border-2 border-primary/50">
                    <img 
                      src={avatarImage} 
                      alt="Player Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Level badge */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card px-4 py-1 border border-secondary"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <span className="text-secondary font-orbitron font-bold text-sm">LVL 99</span>
              </motion.div>

              {/* Floating icons */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-8 h-8 text-secondary" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 -left-8"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Target className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats HUD */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <StatBar 
                key={stat.label} 
                stat={stat} 
                delay={0.5 + index * 0.1}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-secondary/30 to-transparent" />
    </section>
  );
};

interface StatBarProps {
  stat: {
    icon: any;
    label: string;
    value: number | string;
    suffix: string;
    color: string;
  };
  delay: number;
  isInView: boolean;
}

const StatBar = ({ stat, delay, isInView }: StatBarProps) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (isInView && typeof stat.value === 'number') {
      const targetValue = stat.value as number;
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  const colorClasses = {
    primary: 'text-primary border-primary/50 bg-primary/10',
    secondary: 'text-secondary border-secondary/50 bg-secondary/10',
    accent: 'text-accent border-accent/50 bg-accent/10',
  };

  return (
    <motion.div
      className={`glass-card p-4 border-l-4 ${colorClasses[stat.color as keyof typeof colorClasses]}`}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-rajdhani uppercase tracking-wider">
            {stat.label}
          </p>
          <p className="text-2xl font-orbitron font-bold">
            {typeof stat.value === 'number' ? count.toLocaleString() : stat.value}
            <span className="text-muted-foreground">{stat.suffix}</span>
          </p>
        </div>
        
        {/* Progress bar for numeric values */}
        {typeof stat.value === 'number' && (
          <motion.div
            className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <motion.div
              className={`h-full ${stat.color === 'primary' ? 'bg-primary' : stat.color === 'secondary' ? 'bg-secondary' : 'bg-accent'}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: '80%' } : {}}
              transition={{ duration: 1, delay: delay + 0.3 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerProfileSection;
