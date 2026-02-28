import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Heart, Smile, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const missions = [
  { text: "Loading birthday vibes...", icon: <Sparkles className="w-5 h-5" /> },
  { text: "Deploying smile protocol...", icon: <Smile className="w-5 h-5" /> },
  { text: "Sending virtual hugs...", icon: <Heart className="w-5 h-5" /> },
  { text: "Mission complete: She smiled! 🎯", icon: <Target className="w-5 h-5" /> },
];

export default function MissionSection() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMission, setCurrentMission] = useState(0);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    if (progress >= 25 && currentMission === 0) setCurrentMission(1);
    if (progress >= 50 && currentMission === 1) setCurrentMission(2);
    if (progress >= 75 && currentMission === 2) setCurrentMission(3);
  }, [progress, currentMission]);

  const handleStart = () => {
    setStarted(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF69B4", "#00E5FF", "#9B59B6", "#FFD700"],
    });
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="font-orbitron text-2xl md:text-3xl neon-text-pink mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Mission: Make Her Smile 🎯
        </motion.h2>

        {!started ? (
          <motion.button
            onClick={handleStart}
            className="mt-8 px-8 py-4 font-orbitron text-sm rounded-lg bg-primary text-primary-foreground neon-glow-pink hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶ START MISSION
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Progress bar */}
            <div className="glass-card p-4">
              <div className="flex justify-between font-orbitron text-xs mb-2">
                <span className="text-muted-foreground">PROGRESS</span>
                <span className="neon-text-cyan">{progress}%</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full shimmer"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, hsl(330, 90%, 60%), hsl(190, 100%, 55%))`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Mission messages */}
            <div className="space-y-3">
              {missions.slice(0, currentMission + 1).map((mission, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card p-4 flex items-center gap-3 text-left"
                >
                  <span className={i === currentMission ? "neon-text-cyan" : "text-primary"}>
                    {mission.icon}
                  </span>
                  <span className="font-rajdhani text-foreground">{mission.text}</span>
                  {i < currentMission && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </motion.div>
              ))}
            </div>

            {progress >= 100 && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="neon-text-pink font-orbitron text-lg mt-6"
              >
                ✨ Mission Accomplished ✨
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
