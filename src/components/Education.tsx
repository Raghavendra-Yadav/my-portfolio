'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Education() {
  return (
    <motion.section
      id="Education"
      className="relative !bg-transparent text-black dark:text-white pt-20 pb-16 px-6 overflow-hidden min-h-[80vh]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
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

      <div className="text-center mb-12">
        <h2
          className="text-4xl font-bold"
          style={{ fontFamily: "'Roboto Slab', serif" }}
        >
          Education
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          &ldquo;Protons give an atom its identity, electrons its
          personality.&rdquo;
          <br />– Bill Bryson, *A Short History of Nearly Everything*
        </p>
        <hr className="mt-6 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto" />
      </div>

      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Masters */}
        <EducationCard
          institution="Sacred Heart University"
          year="2025"
          degree="Master of Science – Computer Science (Data Science)"
          description="Pursued my master’s degree with a focus on data science, machine learning, and big data technologies. This program deepens my skills in advanced analytics, software design, and AI-driven development."
          location="Fairfield, Connecticut, USA"
        />

        {/* Bachelors */}
        <EducationCard
          institution="St. Mary’s College"
          year="2020"
          degree="Bachelor of Science – Mathematics, Electronics, Computer Science (MECs)"
          description="Completed a three-year undergraduate program under Osmania University. Built a strong foundation in electronics and computing with subjects like C, C++, Java, Python, SQL, and data structures."
          location="Yousufguda, Hyderabad"
        />

        {/* Intermediate */}
        <EducationCard
          institution="Sri Chaitanya Jr. College"
          year="2017"
          degree="Intermediate – Mathematics, Physics, Chemistry (MPC)"
          description="Focused on core concepts of mathematics and science, preparing me for a technology-oriented academic journey."
          location="S.R. Nagar, Hyderabad"
        />

        {/* School */}
        <EducationCard
          institution="Rau's High School"
          year="2015"
          degree="Telangana Secondary School Certificate (SSC)"
          description="Discovered my passion for web technologies during school and began building small web-based applications."
          location="Bandlaguda, Hyderabad"
        />
      </div>
    </motion.section>
  );
}

function EducationCard({
  institution,
  year,
  degree,
  description,
  location,
}: {
  institution: string;
  year: string;
  degree: string;
  description: string;
  location: string;
}) {
  return (
    <motion.div
      className="md:flex md:items-start gap-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="md:w-1/3 mb-4 md:mb-0">
        <h4 className="text-xl font-semibold">{institution}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Year of Passing – {year}
        </p>
      </div>
      <div className="md:w-2/3">
        <p>
          <strong>{degree}</strong>
          <br />
          {description}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span
            className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white"
            title="Location"
          >
            <FaMapMarkerAlt className="text-xs" />
          </span>
          {location}
        </div>
      </div>
    </motion.div>
  );
}
