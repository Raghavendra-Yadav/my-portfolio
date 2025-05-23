import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Profile from '@/components/Profile';
import Education from '@/components/Education';
import Abilities from '@/components/Abilities';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Golla Raghavendra Yadav</title>
        <meta name="description" content="Welcome to my portfolio website!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Profile />
        <Education />
        <Abilities />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
        {/* Add more sections as needed */}
        {/* Example: <Contact /> */}
        {/* Add more components as needed */}
      </Layout>
    </>
  );
};

export default Home;
