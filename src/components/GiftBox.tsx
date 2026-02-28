import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="font-orbitron text-2xl md:text-3xl neon-text-cyan mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          🎁 A Gift For You
        </motion.h2>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="closed"
                onClick={() => setIsOpen(true)}
                className="glass-card p-12 cursor-pointer group relative neon-glow-pink"
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Gift className="w-20 h-20 text-primary mx-auto mb-4 animate-float" />
                <p className="font-rajdhani text-lg text-muted-foreground">
                  Click to open your gift...
                </p>
              </motion.button>
            ) : (
              <motion.div
                key="open"
                className="glass-card p-10 max-w-md neon-glow-cyan"
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-5xl mb-6">💝</p>
                  <p className="font-space text-xl text-foreground leading-relaxed mb-4">
                    "No matter whatever happens,
                  </p>
                  <p className="font-space text-xl text-foreground leading-relaxed mb-4">
                    if u feel low,"
                  </p>
                  <p className="neon-text-pink font-orbitron text-sm mt-6">
                    — You will find me beside u ❤️
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
