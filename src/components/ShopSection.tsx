import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import NeonButton from './NeonButton';
import { Sparkles, Star, Crown, Gem, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'ultra';
  description: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Normal Sensi',
    price: '₹50.00',
    rarity: 'common',
    description: '',
    icon: <Star className="w-8 h-8" />,
  },
  {
    id: '2',
    name: 'Premium Sensi',
    price: '₹99.00',
    rarity: 'rare',
    description: '',
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    id: '3',
    name: 'DBX Sensi',
    price: '₹100.00',
    rarity: 'epic',
    description: '',
    icon: <Gem className="w-8 h-8" />,
  },
  {
    id: '4',
    name: 'BAUJI x PREMIUM SENSI',
    price: '₹199.00',
    rarity: 'legendary',
    description: '',
    icon: <Crown className="w-8 h-8" />,
  },
  {
    id: '5',
    name: 'BAUJI x PREMIUM SENSI',
    price: '₹199.00',
    rarity: 'ultra',
    description: '',
    icon: <Crown className="w-8 h-8" />,
  },
];

const TELEGRAM_USERNAME = 'USERNAME'; // Replace with actual username

const ShopSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleUnlock = (product: Product) => {
    const message = encodeURIComponent(`Hi! I want to buy ${product.name} (${product.price})`);
    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${message}`, '_blank');
  };

  return (
    <section id="shop" ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <ShoppingCart className="w-8 h-8 text-secondary" />
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold">
            <span className="text-foreground">LOOT </span>
            <span className="text-secondary text-glow-orange">SHOP</span>
          </h2>
        </div>
        <p className="text-muted-foreground font-rajdhani text-lg">
          Unlock exclusive content & level up your game
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto mt-4" />
      </motion.div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <LootCard 
            key={product.id} 
            product={product} 
            index={index}
            isInView={isInView}
            onUnlock={() => handleUnlock(product)}
          />
        ))}
      </div>

      {/* Decorative corners */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 border-t-2 border-l-2 border-secondary/30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-16 h-16 border-b-2 border-r-2 border-secondary/30"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      />
    </section>
  );
};

interface LootCardProps {
  product: Product;
  index: number;
  isInView: boolean;
  onUnlock: () => void;
}

const LootCard = ({ product, index, isInView, onUnlock }: LootCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const rarityConfig = {
    common: {
      border: 'border-rarity-common',
      text: 'text-rarity-common',
      bg: 'bg-rarity-common/10',
      glow: 'shadow-[0_0_15px_hsl(var(--rarity-common)/0.3)]',
      label: 'COMMON',
    },
    rare: {
      border: 'border-rarity-rare',
      text: 'text-rarity-rare',
      bg: 'bg-rarity-rare/10',
      glow: 'shadow-[0_0_20px_hsl(var(--rarity-rare)/0.4)]',
      label: 'RARE',
    },
    epic: {
      border: 'border-rarity-epic',
      text: 'text-rarity-epic',
      bg: 'bg-rarity-epic/10',
      glow: 'shadow-[0_0_25px_hsl(var(--rarity-epic)/0.5)]',
      label: 'EPIC',
    },
    legendary: {
      border: 'border-rarity-legendary',
      text: 'text-rarity-legendary',
      bg: 'bg-rarity-legendary/20',
      glow: 'shadow-[0_0_30px_hsl(var(--rarity-legendary)/0.6)]',
      label: 'LEGENDARY',
    },
  };

  const config = rarityConfig[product.rarity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`relative glass-card border-2 ${config.border} ${isHovered ? config.glow : ''} transition-shadow duration-300 overflow-hidden group`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) scale(1.02)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Rarity badge */}
      <div className={`absolute top-0 left-0 right-0 py-1 text-center text-xs font-orbitron font-bold ${config.bg} ${config.text} border-b ${config.border}`}>
        {config.label}
      </div>

      {/* Content */}
      <div className="pt-10 pb-4 px-4 text-center">
        {/* Icon */}
        <motion.div
          className={`mx-auto w-16 h-16 rounded-full ${config.bg} flex items-center justify-center mb-4 ${config.text}`}
          animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {product.icon}
        </motion.div>

        {/* Name */}
        <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm font-rajdhani mb-4 min-h-[40px]">
          {product.description}
        </p>

        {/* Price */}
        <div className={`text-2xl font-orbitron font-black mb-4 ${config.text}`}>
          {product.price}
        </div>

        {/* Unlock button */}
        <NeonButton
          variant={product.rarity === 'legendary' ? 'secondary' : 'primary'}
          size="sm"
          onClick={onUnlock}
          className="w-full"
        >
          BUY
        </NeonButton>
      </div>

      {/* Decorative corner */}
      <div className={`absolute bottom-0 right-0 w-8 h-8 ${config.border} border-t-2 border-l-2 opacity-30`} 
           style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} 
      />
    </motion.div>
  );
};

export default ShopSection;
