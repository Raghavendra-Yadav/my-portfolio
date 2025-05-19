import React from 'react';
import Layout from '../components/Layout';

const Projects: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <p className="mb-4">Here are some of the projects I have worked on:</p>
            <ul className="list-disc pl-5">
                <li>
                    <strong>Project 1:</strong> Description of project 1.
                </li>
                <li>
                    <strong>Project 2:</strong> Description of project 2.
                </li>
                <li>
                    <strong>Project 3:</strong> Description of project 3.
                </li>
                {/* Add more projects as needed */}
            </ul>
        </Layout>
    );
};

export default Projects;