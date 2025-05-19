import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Profile from '@/components/Profile';

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
      </Layout>
    </>
  );
};

export default Home;
