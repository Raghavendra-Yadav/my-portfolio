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
    <div className="bg-gray-800 text-white py-8">
      <div id="contact" className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
        <p className="text-center text-gray-400 italic mb-6">
          &ldquo;If I had asked people what they wanted, they would have said
          faster horses.&rdquo;
          <br />- Henry Ford
        </p>

        <hr className="border-gray-600 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <div>
            <ul className="space-y-4 text-center">
              <li>
                <a
                  href="https://www.instagram.com/golla_raghavendra_yadav/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-4 hover:text-gray-300"
                >
                  <FaInstagram size={24} />
                  <span>golla_raghavendra_yadav</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/golla-raghavendra-yadav/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-4 hover:text-gray-300"
                >
                  <FaLinkedin size={24} />
                  <span>golla-raghavendra-yadav</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Raghavendra-Yadav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:text-gray-300"
                >
                  <FaGithub size={24} />
                  <span>Raghavendra-Yadav</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-4 text-center">
              <li>
                <a
                  href="https://twitter.com/its4Raghavendra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex space-x-4 hover:text-gray-300"
                >
                  <FaXTwitter size={24} />
                  <span>@its4Raghavendra</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/user/QuantumQuillQuester/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex space-x-4 hover:text-gray-300"
                >
                  <FaReddit size={24} />
                  <span>@QuantumQuillQuester</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:graghavendra.yadav@gmail.com"
                  className="flex space-x-4 hover:text-gray-300"
                >
                  <FaEnvelope size={24} />
                  <span>graghavendra.yadav@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-600 mt-6 mb-4" />
        <p className="text-center text-gray-500">
          © {currentYear} Golla Raghavendra Yadav.
        </p>
      </div>
    </div>
  );
};

export default Footer;
