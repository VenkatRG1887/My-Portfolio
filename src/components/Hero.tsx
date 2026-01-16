import React from 'react';
import { Download, Mail } from 'lucide-react';
import content from '../data/content.json';
import resume from '../../Assets/Venkata Rao Gonugunta.pdf';
import profile from '../../Assets/profile.png';

const Hero: React.FC = () => {
  const { hero } = content as {
    hero: { name: string; title: string; valueProp: string; profileImage: string };
  };

  const handleDownloadCV = () => {
    try {
      const link = document.createElement('a');
      link.href = resume;
      link.download = 'Venkata Rao Gonugunta.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      window.open(resume, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center px-4" aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="w-full md:basis-[70%] md:flex md:flex-col md:justify-center text-center md:text-left space-y-6">
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {hero.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium">{hero.title}</p>
            <div className="max-w-none">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{hero.valueProp}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center items-center pt-2">
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-xl"
                aria-label="Download CV PDF"
              >
                <Download size={20} />
                Download CV
              </button>

              <button
                onClick={handleContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Go to contact section"
              >
                <Mail size={20} />
                Get In Touch
              </button>
            </div>
          </div>

          {/* RIGHT: Picture */}
          <div className="w-full md:basis-[30%] md:flex md:items-center md:justify-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden ring-4 ring-blue-500/20 dark:ring-blue-400/20 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-900 transition-all duration-300 hover:ring-blue-500/40 dark:hover:ring-blue-400/40">
                <img
                  src={profile} 
                  alt={`${hero.name} - Professional headshot`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
