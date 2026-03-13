import React from 'react';
import { motion } from 'motion/react';
import { Play, ExternalLink } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoCardProps {
  video: VideoProject;
  onClick: (video: VideoProject) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [thumbnailUrl, setThumbnailUrl] = React.useState(video.thumbnail);

  const handleImageError = React.useCallback(() => {
    if (thumbnailUrl.includes('maxresdefault.jpg')) {
      setThumbnailUrl(`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`);
    } else if (thumbnailUrl.includes('hqdefault.jpg')) {
      setThumbnailUrl(`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`);
    }
  }, [thumbnailUrl, video.youtubeId]);

  // YouTube returns a 120x90 placeholder if the requested resolution doesn't exist.
  // We check the image dimensions after it loads to catch this.
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth === 120 && img.naturalHeight === 90) {
      handleImageError();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass-card cursor-pointer"
      onClick={() => onClick(video)}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={thumbnailUrl}
          alt={video.title}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </motion.div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold rounded-full">
            {video.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-white/60 text-sm line-clamp-2 font-light leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
};
