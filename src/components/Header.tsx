import React from 'react';
import { motion } from 'motion/react';
import { Fish, Youtube, Instagram, Mail } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,162,255,0.4)]">
            <Fish className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">MRFISHY<span className="text-accent">.</span>CC</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-white/60">
          <a href="#featured" className="hover:text-white transition-colors">Featured</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://www.youtube.com/@MrFishyCC" target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/mrfishycc?igsh=MXZ4MG50ZG9kZnJwMw==" target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
        </div>
      </div>
    </header>
  );
};
