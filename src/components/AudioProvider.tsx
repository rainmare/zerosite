"use client";

import { createContext, useContext, useState, useRef, useCallback } from "react";

type AudioContextType = {
  muted: boolean;
  toggleMute: () => void;
  playAmbient: () => void;
};

const AudioCtx = createContext<AudioContextType>({
  muted: false,
  toggleMute: () => {},
  playAmbient: () => {},
});

export function useAudio() {
  return useContext(AudioCtx);
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAmbient = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/ambient.wav");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }
    audioRef.current.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ muted, toggleMute, playAmbient }}>
      {children}
    </AudioCtx.Provider>
  );
}
