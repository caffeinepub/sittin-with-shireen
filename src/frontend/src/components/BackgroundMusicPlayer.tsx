import { useMusic } from '../context/MusicContext';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Slider } from './ui/slider';

export default function BackgroundMusicPlayer() {
  const { isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute } = useMusic();

  return (
    <div className="fixed bottom-6 right-6 bg-card border-2 border-primary rounded-full shadow-glow p-4 z-40 flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-all"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-primary-foreground fill-current" />
        ) : (
          <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
        )}
      </button>

      <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      <Slider
        value={[isMuted ? 0 : volume]}
        max={1}
        step={0.01}
        onValueChange={(value) => setVolume(value[0])}
        className="w-24"
      />
    </div>
  );
}

