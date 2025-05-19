import React from 'react';
import Image from 'next/image';
import { FaArrowUpRightFromSquare, FaFileCircleExclamation } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'friendSpot',
    description: 'Social networking site solely created by me. Currently not available on Web.',
    tags: ['Development', 'PHP', 'MySQL'],
    image: '/images/projectImages/FS.png',
    link: '#',
    icon: FaFileCircleExclamation,
  },
  {
    title: 'Endurance Software Solutions',
    description: 'Build the website of the local company.',
    tags: ['Design', 'Development', 'Bootstrap'],
    image: '/images/projectImages/Endurance.png',
    link: 'https://raghav111.github.io/Endurance/',
    icon: FaArrowUpRightFromSquare,
  },
  {
    title: 'Youtube Subtitles Extractor',
    description: 'Extract subtitles from youtube video using links.',
    tags: ['Development', 'Node.js'],
    image: '/images/projectImages/YoutubeSubtitles.png',
    link: 'https://youtubesubtitlesextractor.herokuapp.com/',
    icon: FaArrowUpRightFromSquare,
  },
  {
    title: 'Product Preview Card Component',
    description: 'Challenge from frontend Mentor website',
    tags: ['Development'],
    image: '/images/projectImages/Product.png',
    link: 'https://raghav111.github.io/4.Product-preview-card-component/',
    icon: FaArrowUpRightFromSquare,
  },
];

export default function Projects() {
  return (
    <section
      id="Projects"
      className="scroll-mt-16 min-h-screen relative !bg-transparent text-black dark:text-white pt-28 pb-16 px-6 overflow-hidden"
    >
      {/* Top blurred gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Bottom blurred gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/grain.png'), url('/noise.png')",
          opacity: 0.15,
          mixBlendMode: 'overlay',
        }}
      />

      <motion.div
        className="text-center mb-12 relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Gradient behind heading */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 rounded-full blur-2xl opacity-60 z-0"
          style={{
            background: 'linear-gradient(90deg, #ff80b5 0%, #9089fc 100%)',
          }}
        />
        <h2
          className="text-4xl font-bold relative z-10"
          style={{ fontFamily: "'Roboto Slab', serif" }}
        >
          Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto relative z-10">
          &ldquo;You can do anything you set your mind to.&rdquo;
          <br />– Benjamin Franklin
        </p>
        <hr className="mt-6 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto relative z-10" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  idx,
}: {
  project: (typeof projects)[0];
  idx: number;
}) {
  const Icon = project.icon;
  return (
    <motion.div
      className="flex items-stretch gap-6 bg-white/80 dark:bg-gray-900/70 shadow-2xl rounded-xl p-6 relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: idx * 0.12,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 350,
        damping: 22,
      }}
    >
      <div className="w-24 h-24 relative rounded-xl overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow flex-shrink-0 self-center">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <a
          href={project.link}
          className="group inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold mt-2 px-2 py-1 rounded-full bg-gradient-to-r from-[#ff80b5]/30 to-[#9089fc]/30 hover:from-[#ff80b5]/60 hover:to-[#9089fc]/60 transition-all duration-300 shadow-sm hover:shadow-md text-sm self-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">View</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <Icon />
          </span>
        </a>
      </div>
    </motion.div>
  );
}
