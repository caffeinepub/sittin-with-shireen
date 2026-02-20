import { Play } from 'lucide-react';
import type { ExternalBlob } from '../backend';

interface VideoCardProps {
  id: string;
  videoBlob: ExternalBlob;
  onPlay: () => void;
}

export default function VideoCard({ id, videoBlob, onPlay }: VideoCardProps) {
  const videoUrl = videoBlob.getDirectURL();

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-border">
      <div className="relative aspect-video bg-muted" onClick={onPlay}>
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="w-8 h-8 text-primary fill-current ml-1" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">Video {id}</h3>
      </div>
    </div>
  );
}
