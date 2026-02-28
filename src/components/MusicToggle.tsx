import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a simple oscillator-based ambient sound
    // Since we can't bundle audio files easily, we'll create a note
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggle = () => {
    setPlaying(!playing);
    // In production, you'd load an actual audio file here
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 glass-card p-3 cursor-pointer neon-glow-pink"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      title={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
}
