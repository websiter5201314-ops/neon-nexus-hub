import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Logo / Name */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Crosshair className="w-6 h-6 text-primary" />
          <span className="font-orbitron font-bold text-xl text-foreground">
            SHANKS<span className="text-primary">SENSI</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-muted-foreground font-rajdhani text-sm mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Built for gamers, by a gamer. Stay competitive. 🎮
        </motion.p>

        {/* Divider */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-6" />

        {/* Copyright */}
        <motion.p
          className="text-muted-foreground/60 text-xs font-rajdhani"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Shanks. All rights reserved.
        </motion.p>

        {/* HUD corners */}
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30" />
      </div>
    </footer>
  );
};

export default Footer;
