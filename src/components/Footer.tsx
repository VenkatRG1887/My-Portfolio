import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4" role="contentinfo">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <div className="text-gray-400">
            <p>&copy; {currentYear} Venkata Rao Gonugunta. All rights reserved.</p>
          </div>

          <div className="flex justify-center gap-8 text-sm">
            <a
              href="#hero"
              className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Back to Top
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </div>

          {/* Disclaimer line */}
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
