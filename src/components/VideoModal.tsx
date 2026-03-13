import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Youtube, ExternalLink } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoModalProps {
  video: VideoProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-5xl glass-card bg-black/40"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 md:-right-12 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-medium mb-2 text-glow">{video.title}</h2>
              <p className="text-white/60 font-light leading-relaxed max-w-2xl">
                {video.description}
              </p>
            </div>
            
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent hover:text-white transition-all duration-300 group"
            >
              <Youtube className="w-5 h-5" />
              <span>View on YouTube</span>
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
