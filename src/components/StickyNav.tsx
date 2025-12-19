import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sounds';

interface StickyNavProps {
  onCreateNew: () => void;
}

const StickyNav = ({ onCreateNew }: StickyNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/60 backdrop-blur-xl border-b border-border/50 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={playHoverSound}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center pulse-glow">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-orbitron font-bold text-xl text-gradient">
                CrazyForms
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="font-inter text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                onMouseEnter={playHoverSound}
              >
                תכונות
              </Button>
              <Button
                variant="ghost"
                className="font-inter text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
                onMouseEnter={playHoverSound}
              >
                תמחור
              </Button>
              <Button
                onClick={() => {
                  playClickSound();
                  onCreateNew();
                }}
                className="btn-neon"
                onMouseEnter={playHoverSound}
              >
                <Zap className="w-4 h-4 ml-2" />
                התחל עכשיו
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                playClickSound();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              onMouseEnter={playHoverSound}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Tray */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-80 max-w-full bg-background/95 backdrop-blur-xl border-l border-border/50 transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="ghost"
              className="w-full justify-start font-inter text-lg py-6 hover:bg-primary/10"
              onMouseEnter={playHoverSound}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              תכונות
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-inter text-lg py-6 hover:bg-primary/10"
              onMouseEnter={playHoverSound}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              תמחור
            </Button>
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => {
                playClickSound();
                onCreateNew();
                setIsMobileMenuOpen(false);
              }}
              className="w-full btn-neon py-6"
              onMouseEnter={playHoverSound}
            >
              <Zap className="w-5 h-5 ml-2" />
              התחל עכשיו
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default StickyNav;
