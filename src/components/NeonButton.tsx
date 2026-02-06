import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

const NeonButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className,
  href
}: NeonButtonProps) => {
  const baseStyles = "relative overflow-hidden font-orbitron font-bold uppercase tracking-wider transition-all duration-300";
  
  const variants = {
    primary: "bg-primary/20 text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground",
    secondary: "bg-secondary/20 text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground",
    accent: "bg-accent/20 text-accent border-2 border-accent hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const glowColors = {
    primary: "group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
    secondary: "group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.5)]",
    accent: "group-hover:shadow-[0_0_30px_hsl(var(--accent)/0.5)]",
  };

  const ButtonContent = (
    <>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
      
      {/* Text with glow */}
      <span className="relative z-10">{children}</span>
    </>
  );

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    glowColors[variant],
    "group",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {ButtonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {ButtonContent}
    </motion.button>
  );
};

export default NeonButton;
