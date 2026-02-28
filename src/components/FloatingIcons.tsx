import { motion } from "framer-motion";
import { Gamepad2, Headphones, Keyboard } from "lucide-react";

const icons = [
  { Icon: Gamepad2, x: "10%", y: "20%", delay: 0, size: 28 },
  { Icon: Headphones, x: "85%", y: "15%", delay: 1, size: 24 },
  { Icon: Keyboard, x: "75%", y: "70%", delay: 2, size: 26 },
  { Icon: Gamepad2, x: "15%", y: "75%", delay: 0.5, size: 20 },
  { Icon: Headphones, x: "90%", y: "50%", delay: 1.5, size: 22 },
];

export default function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {icons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-muted-foreground/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon style={{ width: size, height: size }} />
        </motion.div>
      ))}
    </div>
  );
}
