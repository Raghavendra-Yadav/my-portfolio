import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">About Me</h1>
                <p className="mb-4">
                    Welcome to my portfolio! I am a passionate developer with a love for creating dynamic and engaging web applications. 
                    My journey in tech began with a fascination for problem-solving and a desire to build things that make a difference.
                </p>
                <p className="mb-4">
                    I specialize in using modern technologies like Next.js, React, and Tailwind CSS to create responsive and user-friendly interfaces. 
                    I believe in the power of clean code and continuous learning, and I am always exploring new tools and frameworks to enhance my skills.
                </p>
                <p>
                    Thank you for visiting my portfolio. Feel free to check out my projects and blog to learn more about my work!
                </p>
            </div>
        </Layout>
    );
};

export default About;