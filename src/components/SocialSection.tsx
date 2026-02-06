import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Youtube } from 'lucide-react';

const socials = [
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/shanks_livee?igdh=MXBsenl4Zm93cGVzaA==',
    color: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
    hoverGlow: 'hover:shadow-[0_0_30px_#FD1D1D]',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@shanks-livee?si=v90WErrcdh4whfuH',
    color: 'from-[#FF0000] to-[#CC0000]',
    hoverGlow: 'hover:shadow-[0_0_30px_#FF0000]',
  },
];

const SocialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <span className="text-foreground">SOCIAL </span>
          <span className="text-primary text-glow-cyan">HUB</span>
        </h2>
        <p className="text-muted-foreground font-rajdhani text-lg">
          Join the community & stay connected
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto mt-4" />
      </motion.div>

      {/* Social icons */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
        {socials.map((social, index) => (
          <SocialIcon
            key={social.name}
            social={social}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </section>
  );
};

interface SocialIconProps {
  social: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    url: string;
    color: string;
    hoverGlow: string;
  };
  index: number;
  isInView: boolean;
}

const SocialIcon = ({ social, index, isInView }: SocialIconProps) => {
  const Icon = social.icon;

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group`}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
      } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ scale: 1.15, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }}
      >
        {/* Icon container */}
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center transition-all duration-300 ${social.hoverGlow}`}
        >
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>

        {/* Label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="text-xs font-orbitron font-bold text-muted-foreground whitespace-nowrap">
            {social.name}
          </span>
        </motion.div>
      </motion.div>

      {/* Pulse ring effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-30`}
        animate={{ scale: [1, 1.3, 1], opacity: [0, 0.3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.a>
  );
};

export default SocialSection;
