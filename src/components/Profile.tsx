'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa'; // Import LinkedIn logo from react-icons

export default function Profile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        id="Profile"
        ref={ref}
        className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen px-4 py-12 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Title Section at Top */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold"
            style={{ fontFamily: "'Roboto Slab', serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Profile
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            I&apos;m a creative Web developer
          </motion.p>
          <motion.hr
            className="mt-4 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transformOrigin: 'center' }}
          />
        </div>

        {/* Centered Grid Content */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch text-left">
          {/* About Me */}
          <motion.div
            className="px-4 h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              About Me
            </h3>
            <p className="mb-4">
              I am a full-stack web developer specializing in front-end
              development and UI/UX design. I create responsive, user-friendly
              web applications using modern frameworks like React, Next.js, and
              Tailwind CSS.
            </p>
            <p>
              I enjoy crafting intuitive interfaces, optimizing performance, and
              exploring design trends. Beyond coding, I love reading non-fiction
              and staying updated with the latest technologies.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-500 opacity-70 blur-2xl animate-pulse" />
              <Image
                src="/images/me.jpeg"
                alt="Author Picture"
                width={240}
                height={240}
                className="relative z-10 rounded-full w-60 h-60 object-cover border-4 border-gray-300 dark:border-gray-700"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            className="px-4 h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              Details
            </h3>
            <p>
              <strong style={{ fontFamily: "'Roboto Slab', serif" }}>
                Name:
              </strong>{' '}
              <br />
              Golla Raghavendra Yadav
            </p>
            <p>
              <strong style={{ fontFamily: "'Roboto Slab', serif" }}>
                Age:
              </strong>{' '}
              <br />
              25 years
            </p>
            <p>
              <strong style={{ fontFamily: "'Roboto Slab', serif" }}>
                Location:
              </strong>{' '}
              <br />
              Hyderabad, Telangana, India, Earth
            </p>
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
              >
                <FaLinkedin className="mr-2 text-lg" /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
