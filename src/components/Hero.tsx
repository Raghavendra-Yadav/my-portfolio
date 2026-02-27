'use client';

import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Hero() {
  return (
    <div id="home" className="bg-white dark:bg-black min-h-screen">
      <div className="relative isolate h-full px-6 lg:px-8">
        <AnimatedBackground theme="pink" />

        {/* Hero content — centered */}
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: "'Roboto Slab', serif" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Golla Raghavendra Yadav
          </motion.h1>
          <motion.hr
            className="my-6 w-1/2 border-gray-300 dark:border-gray-700"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Full Stack Web Developer | Designer | Author | Illustrator
          </motion.p>
        </div>


      </div>
    </div>
  );
}
