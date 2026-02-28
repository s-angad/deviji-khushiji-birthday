import { motion } from "framer-motion";
import { Gamepad2, Headphones, Keyboard, Heart, Star, Trophy } from "lucide-react";

const memories = [
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "First Message",
    text: "your sweet answer",
    color: "neon-text-pink",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "sarcastic tones",
    text: "but i still liked it",
    color: "neon-text-cyan",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Your First voicenote",
    text: "was even more sweet",
    color: "neon-text-pink",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "The Moment I Knew",
    text: "a little different maybe",
    color: "neon-text-cyan",
  },
  {
    icon: <Keyboard className="w-6 h-6" />,
    title: "Today — Your Birthday",
    text: " Happy Birthday, Khushi ji. ❤️",
    color: "neon-text-cyan",
  },
];

export default function MemoryTimeline() {
  return (
    <section className="py-20 px-4 relative z-10">
      <motion.h2
        className="font-orbitron text-2xl md:text-3xl text-center neon-text-pink mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        📜 Our Timeline
      </motion.h2>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

        {memories.map((memory, i) => (
          <motion.div
            key={i}
            className={`relative flex items-center mb-12 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Node */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary neon-glow-pink -translate-x-1.5 z-10" />

            {/* Card */}
            <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
              <div className="glass-card p-6 group hover:neon-glow-pink transition-all duration-500">
                <div className={`${memory.color} mb-2`}>{memory.icon}</div>
                <h3 className={`font-orbitron text-sm ${memory.color} mb-2`}>
                  {memory.title}
                </h3>
                <p className="font-rajdhani text-muted-foreground text-base leading-relaxed">
                  {memory.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
