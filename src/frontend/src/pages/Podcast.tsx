import { useState } from 'react';
import { useGetEpisodes } from '../hooks/useQueries';
import EpisodeCard from '../components/EpisodeCard';
import AudioPlayer from '../components/AudioPlayer';
import { Loader2, Mic } from 'lucide-react';
import type { Episode } from '../backend';

export default function Podcast() {
  const { data: episodes, isLoading } = useGetEpisodes();
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

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
            <Mic className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Podcast Episodes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Listen to extended conversations and exclusive content
        </p>
      </div>

      {!episodes || episodes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No episodes yet. Check back soon!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isPlaying={currentEpisode?.id === episode.id}
              onPlay={() => setCurrentEpisode(episode)}
            />
          ))}
        </div>
      )}

      {currentEpisode && (
        <AudioPlayer
          episode={currentEpisode}
          onClose={() => setCurrentEpisode(null)}
        />
      )}
    </div>
  );
}
