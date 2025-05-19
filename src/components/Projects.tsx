import React from 'react';
import Image from 'next/image';
import {
  FaArrowUpRightFromSquare,
  FaFileCircleExclamation,
} from 'react-icons/fa6';

const projects = [
  {
    title: 'friendSpot',
    description:
      'Social networking site solely created by me. Currently not available on Web.',
    tags: ['Development', 'PHP', 'MySQL'],
    image: '/images/projectImages/FS.png',
    link: '#',
    icon: <FaFileCircleExclamation />,
  },
  {
    title: 'Endurance Software Solutions',
    description: 'Build the website of the local company.',
    tags: ['Design', 'Development', 'Bootstrap'],
    image: '/images/projectImages/Endurance.png',
    link: 'https://raghav111.github.io/Endurance/',
    icon: <FaArrowUpRightFromSquare />,
  },
  {
    title: 'Youtube Subtitles Extractor',
    description: 'Extract subtitles from youtube video using links.',
    tags: ['Development', 'Node.js'],
    image: '/images/projectImages/YoutubeSubtitles.png',
    link: 'https://youtubesubtitlesextractor.herokuapp.com/',
    icon: <FaArrowUpRightFromSquare />,
  },
  {
    title: 'Product Preview Card Component',
    description: 'Challenge from frontend Mentor website',
    tags: ['Development'],
    image: '/images/projectImages/Product.png',
    link: 'https://raghav111.github.io/4.Product-preview-card-component/',
    icon: <FaArrowUpRightFromSquare />,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-5 md:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Projects</h2>
      <p className="text-center text-lg italic mb-10">
        “You can do anything you set your mind to.”
        <br />- Benjamin Franklin
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={350}
              className="w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-3">{project.description}</p>
              <p className="text-sm mb-4">
                <strong>Tags:</strong> {project.tags.join(', ')}
              </p>
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                target="_blank"
              >
                View more {project.icon}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
