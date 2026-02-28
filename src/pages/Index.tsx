import { Suspense } from "react";
import { motion } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import birthdayGirl from "@/assets/birthday-girl.jpg";
import FloatingParticles from "@/components/FloatingParticles";
import FloatingIcons from "@/components/FloatingIcons";
import GiftBox from "@/components/GiftBox";
import MemoryTimeline from "@/components/MemoryTimeline";
import MissionSection from "@/components/MissionSection";
import SecretMessage from "@/components/SecretMessage";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <FloatingParticles />
      <FloatingIcons />
      <MusicToggle />

      {/* Hero Section */}
      <section className="relative z-10 pt-8">
        <Suspense
          fallback={
            <div className="h-[70vh] flex items-center justify-center">
              <div className="font-orbitron text-muted-foreground animate-pulse">
                Loading...
              </div>
            </div>
          }
        >
          <HeroScene />
        </Suspense>

        {/* Hero Text Overlay */}
        <div className="text-center -mt-16 relative z-20 px-4">
          {/* Birthday Girl Photo */}
          <motion.div
            className="mx-auto mb-8 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <img
              src={birthdayGirl}
              alt="Birthday Girl"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          <motion.h1
            className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold neon-text-pink mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Happy Birthday, My Favorite IGL ❤️
          </motion.h1>

          <motion.p
            className="font-space text-lg md:text-xl text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            You lead in game… and somehow lead my heart too.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-1/2 mx-auto my-16 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

      {/* Gift Box */}
      <GiftBox />

      {/* Memory Timeline */}
      <MemoryTimeline />

      {/* Mission Section */}
      <MissionSection />

      {/* Divider */}
      <div className="h-px w-1/2 mx-auto my-8 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30" />

      {/* Secret Message */}
      <SecretMessage />

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <motion.p
          className="font-orbitron text-xs text-muted-foreground tracking-[0.3em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CRAFTED WITH ❤️ FOR THE BEST IGL
        </motion.p>
      </footer>
    </div>
  );
};

export default Index;
