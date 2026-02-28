import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

export default function SecretMessage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.button
                onClick={() => setRevealed(true)}
                className="glass-card px-10 py-6 font-orbitron text-sm neon-glow-pink group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lock className="w-8 h-8 text-primary mx-auto mb-3 group-hover:animate-pulse-glow" />
                <span className="neon-text-pink">🔓 Press to Unlock Secret Message</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 80, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                className="glass-card p-12 neon-glow-cyan"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-space text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "Tho its been a few hours since we are talking,"
                </p>
                <motion.p
                  className="font-space text-xl md:text-2xl leading-relaxed text-gradient-pink-cyan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  "but i have really been liking the conversation and i hope it doesnt ends.  ❤️"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="mt-8"
                >
                  <p className="text-4xl">💖</p>
                  <p className="font-orbitron text-xs text-muted-foreground mt-4 tracking-widest">
                    GG WP — FOREVER
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
