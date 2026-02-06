import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
import NeonButton from './NeonButton';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated corner frames */}
      <div className="absolute inset-8 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary"
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-secondary"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>

      {/* Main content */}
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Loading bar animation */}
        <motion.div 
          className="mb-8 mx-auto w-64 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground font-rajdhani text-lg md:text-xl mb-4 tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Welcome to the Arena
        </motion.p>

        {/* Main title with glitch */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6 text-glow-cyan">
          <GlitchText text="SHADOW" />
          <br />
          <span className="text-secondary text-glow-orange">
            <GlitchText text="STRIKER" />
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-rajdhani text-foreground/80 mb-8 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Enter the Battleground
        </motion.p>

        {/* Stats preview */}
        <motion.div
          className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { label: 'SUBSCRIBERS', value: '7K+' },
            { label: 'VIDEOS', value: '200+' },
            { label: 'KILLS', value: '∞' },
          ].map((stat, index) => (
            <div key={stat.label} className="hud-stat">
              <span className="text-primary font-orbitron font-bold text-lg md:text-2xl">{stat.value}</span>
              <span className="text-muted-foreground text-xs md:text-sm ml-2">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <NeonButton 
            variant="primary" 
            size="lg" 
            onClick={scrollToShop}
            className="animate-pulse-neon"
          >
            Enter Shop
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent to-primary/50" />
      <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-l from-transparent to-secondary/50" />
    </section>
  );
};

export default HeroSection;
