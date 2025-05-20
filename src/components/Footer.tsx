import React from 'react';
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaGithub,
  FaReddit,
} from 'react-icons/fa6';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Social links and copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-500 text-left mb-4 md:mb-0">
            © {currentYear} Golla Raghavendra Yadav. All rights reserved.
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="https://www.instagram.com/golla_raghavendra_yadav/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/golla-raghavendra-yadav/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/Raghavendra-Yadav"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/its4Raghavendra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://www.reddit.com/user/QuantumQuillQuester/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
              aria-label="Reddit"
            >
              <FaReddit size={24} />
            </a>
            <a
              href="mailto:graghavendra.yadav@gmail.com"
              className="hover:text-red-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
