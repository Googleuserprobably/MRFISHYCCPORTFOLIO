/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import { Header } from './components/Header';
import { VideoCard } from './components/VideoCard';
import { VideoModal } from './components/VideoModal';
import { LegalModal } from './components/LegalModal';
import { ContactSection } from './components/ContactSection';
import { VIDEO_PROJECTS } from './constants';
import { VideoProject } from './types';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  const featuredVideos = VIDEO_PROJECTS.filter(v => v.featured);
  const allVideos = VIDEO_PROJECTS;

  return (
    <div className="min-h-screen">
      <div className="atmosphere" />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0502]" />
            <img 
              src="https://picsum.photos/seed/cinematic/1920/1080?blur=2" 
              className="w-full h-full object-cover opacity-30"
              alt="Hero Background"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
                Video Editor & Visual Storyteller
              </span>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
                EDITING <br />
                <span className="text-glow italic font-serif font-light">BEYOND BOUNDARIES</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-12">
                16-year-old editor with 2 years of experience in After Effects and CapCut. I create engaging edits with text effects, precise pacing, and compelling storytelling.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => setSelectedVideo(VIDEO_PROJECTS[0])}
                  className="px-10 py-5 bg-white text-black font-bold rounded-full flex items-center gap-3 hover:bg-accent hover:text-white transition-all duration-300 group"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Watch Latest Edit</span>
                </button>
                <a 
                  href="https://www.youtube.com/@MrFishyCC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <span>YouTube Channel</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </section>

        {/* Featured Section */}
        <section id="featured" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Curated Selection</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
              </div>
              <div className="hidden md:block h-px flex-1 mx-12 bg-white/10" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredVideos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onClick={setSelectedVideo} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Full Portfolio Grid */}
        <section id="portfolio" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">Complete Works</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">All Projects</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allVideos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onClick={setSelectedVideo} 
                />
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </div>
  );
}

