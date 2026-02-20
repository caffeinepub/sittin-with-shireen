import { useState } from 'react';
import { useGetVideos } from '../hooks/useQueries';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import { Loader2, Video as VideoIcon } from 'lucide-react';

export default function Videos() {
  const { data: videos, isLoading } = useGetVideos();
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; url: string } | null>(null);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <VideoIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Episodes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Watch full episodes and highlights from Sittin with Shireen
        </p>
      </div>

      {!videos || videos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No videos yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(([id, videoBlob]) => (
            <VideoCard
              key={id}
              id={id}
              videoBlob={videoBlob}
              onPlay={() => setSelectedVideo({ id, url: videoBlob.getDirectURL() })}
            />
          ))}
        </div>
      )}

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.url}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
