import { Play, Pause } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import type { Episode } from '../backend';

interface EpisodeCardProps {
  episode: Episode;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function EpisodeCard({ episode, isPlaying, onPlay }: EpisodeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all border border-border">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          <button
            onClick={onPlay}
            className="flex-shrink-0 w-12 h-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary-foreground fill-current" />
            ) : (
              <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground mb-2">{episode.title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">{episode.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
