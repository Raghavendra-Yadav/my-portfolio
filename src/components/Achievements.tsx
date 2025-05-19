import React from 'react';
import { FaAmazon } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'Artificial Intelligence: Crash Course',
    author: 'Raghavendra Yadav',
    description: `It’s everywhere, whether we notice it or not. It’s taking the critical decisions in almost every field, from finance to health. It’s driving the algorithms of probably every technology giant’s like Google, Facebook, Amazon, Netflix and many more organizations around the world. Artificially Intelligence systems are analyzing huge, I mean like huge amounts of data that we’re generating every minute through our smart devices to infer patterns and predicts likely futures.`,
    image: '/images/Front.png',
    link: 'https://www.amazon.in/Artificial-Intelligence-Course-Raghavendra-Yadav-ebook/dp/B097PPQNF8',
    button: 'Buy on amazon',
    icon: FaAmazon,
  },
];

const Achievements = () => {
  const Icon = achievements[0].icon;
  return (
    <section
      id="Achievements"
      className="scroll-mt-16 min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10 relative">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 rounded-full blur-2xl opacity-60 z-0"
            style={{
              background: 'linear-gradient(90deg, #ff80b5 0%, #9089fc 100%)',
            }}
          />
          <motion.h2
            className="text-4xl font-bold relative z-10"
            style={{ fontFamily: "'Roboto Slab', serif" }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            Achievements
          </motion.h2>
          <motion.p
            className="text-lg italic mt-2 mb-6 text-gray-600 dark:text-gray-400 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            “Success is the sum of small efforts, repeated day in and day out.”
            <br />– Robert Collier
          </motion.p>
          <motion.hr
            className="mt-4 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto relative z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'center' }}
          />
        </div>
        <div className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center min-h-[400px] bg-transparent">
          {/* Image Card - comes in front */}
          <div className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:z-30 w-full md:w-[350px] md:min-h-[540px] flex items-center justify-center rounded-[20px] overflow-hidden bg-black shadow-2xl">
            <Image
              src={achievements[0].image}
              alt={achievements[0].title}
              width={340}
              height={540}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {/* Details Card - more width and behind image */}
          <div className="relative md:static z-20 w-full md:w-[70%] md:min-h-[620px] bg-white dark:bg-gray-900 rounded-[20px] shadow-xl flex flex-col justify-center px-6 py-12 md:ml-[140px]">
            <div className="md:pl-40 md:pr-20">
              <h3
                className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-center"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                {achievements[0].title}
              </h3>
              <div
                className="uppercase tracking-widest text-gray-500 font-bold mb-6 text-center"
                style={{ letterSpacing: '0.1em' }}
              >
                {achievements[0].author}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-10 text-left">
                {achievements[0].description}
              </p>
              <div className="flex justify-center">
                <a
                  href={achievements[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-full bg-gradient-to-r from-[#FF9900] via-[#FFB84D] to-[#232F3E] text-white shadow-lg hover:from-[#FF9900]/90 hover:to-[#232F3E]/90 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  {achievements[0].button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
