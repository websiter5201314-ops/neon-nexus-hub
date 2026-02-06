import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play, Youtube } from 'lucide-react';

const videos = [
  {
    id: 'VIDEO_ID_1',
    title: 'INSANE CLUTCH MOMENT',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
  },
  {
    id: 'VIDEO_ID_2',
    title: 'TOP 10 KILLS MONTAGE',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop',
  },
  {
    id: 'VIDEO_ID_3',
    title: 'PRO TIPS & TRICKS',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=225&fit=crop',
  },
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <Youtube className="w-8 h-8 text-destructive" />
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold">
            <span className="text-foreground">GAMING </span>
            <span className="text-accent text-glow-purple">SHOWCASE</span>
          </h2>
        </div>
        <p className="text-muted-foreground font-rajdhani text-lg">
          Watch the latest gameplay highlights
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-accent via-primary to-secondary mx-auto mt-4" />
      </motion.div>

      {/* Videos grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* CTA to YouTube channel */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.a
          href="https://youtube.com/@YOURCHANNEL"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 font-orbitron font-bold text-foreground border-2 border-destructive/50 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Youtube className="w-5 h-5 text-destructive" />
          SUBSCRIBE FOR MORE
        </motion.a>
      </motion.div>
    </section>
  );
};

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
  };
  index: number;
  isInView: boolean;
}

const VideoCard = ({ video, index, isInView }: VideoCardProps) => {
  return (
    <motion.div
      className="relative glass-card border border-accent/30 overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </motion.div>
        </motion.div>

        {/* Scanlines overlay */}
        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="font-orbitron font-bold text-sm md:text-base text-foreground group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground text-xs">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span>LATEST</span>
        </div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' }}
      />
    </motion.div>
  );
};

export default VideoSection;
