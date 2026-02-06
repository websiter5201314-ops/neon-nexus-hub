import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import PlayerProfileSection from '@/components/PlayerProfileSection';
import ShopSection from '@/components/ShopSection';
import VideoSection from '@/components/VideoSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated particle background */}
      <ParticleBackground />
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-20" />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <PlayerProfileSection />
        <ShopSection />
        <VideoSection />
        <SocialSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
