import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolumeState] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('https://www.bensound.com/bensound-music/bensound-ukulele.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Load preferences from localStorage
    const savedVolume = localStorage.getItem('bgMusicVolume');
    const savedMuted = localStorage.getItem('bgMusicMuted');
    const savedPlaying = localStorage.getItem('bgMusicPlaying');

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
      audio.volume = vol;
    }

    if (savedMuted === 'true') {
      setIsMuted(true);
      audio.volume = 0;
    }

    if (savedPlaying !== 'false') {
      audio.play().catch(() => {
        // Autoplay might be blocked
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('bgMusicPlaying', 'false');
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
      localStorage.setItem('bgMusicPlaying', 'true');
    }
  };

  const setVolume = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolumeState(newVolume);
    if (!isMuted) {
      audio.volume = newVolume;
    }
    localStorage.setItem('bgMusicVolume', newVolume.toString());
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
      localStorage.setItem('bgMusicMuted', 'false');
    } else {
      audio.volume = 0;
      setIsMuted(true);
      localStorage.setItem('bgMusicMuted', 'true');
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, volume, isMuted, togglePlay, setVolume, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
}
