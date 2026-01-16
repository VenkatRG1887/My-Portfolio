import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import content from '../data/content.json';
import cmp1 from '../../Assets/GM Financial.png';
import cmp2 from '../../Assets/Technox Technologies .png';
import cmp3 from '../../Assets/NeoXam.png';


type ExperienceItem = {
  id: string | number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo?: string;   // optional real logo path
  logoUrl?: string;
};

const UniqueExperience: React.FC = () => {
  const { experience } = content as { experience: ExperienceItem[] };

  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Refs & Sizing
  const orbitHostRef = useRef<HTMLDivElement | null>(null);
  const [hostSize, setHostSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const BUTTON = 64;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);

    const el = orbitHostRef.current;
    if (!el) return () => mq.removeEventListener('change', onChange);

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setHostSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);

    return () => {
      mq.removeEventListener('change', onChange);
      ro.disconnect();
    };
  }, []);

  const baseRadius = useMemo(() => {
    const w = window.innerWidth;
    if (w < 768) return 110;
    if (w < 1024) return 140;
    return 170;
  }, []);

  const orbitRadius = useMemo(() => {
    const maxInside =
      Math.max(0, Math.min(hostSize.w, hostSize.h) / 2 - BUTTON / 2 - 6);
    return Math.max(70, Math.min(baseRadius, maxInside));
  }, [hostSize, baseRadius]);

  const orbitSize = Math.max(0, orbitRadius * 2 + BUTTON);

  const handleExperienceSelect = useCallback((index: number) => {
    if (index === selectedExperience) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedExperience(index);
      setIsAnimating(false);
    }, prefersReducedMotion ? 0 : 150);
  }, [prefersReducedMotion, selectedExperience]);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleExperienceSelect(index);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = index > 0 ? index - 1 : experience.length - 1;
      handleExperienceSelect(prevIndex);
      (document.querySelector(`[data-experience-index="${prevIndex}"]`) as HTMLElement)?.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = index < experience.length - 1 ? index + 1 : 0;
      handleExperienceSelect(nextIndex);
      (document.querySelector(`[data-experience-index="${nextIndex}"]`) as HTMLElement)?.focus();
    }
  };
  const companyLogos: Record<string, string> = {
    'GM Financial': cmp1,
    'Technox Technologies': cmp2,
    'NeoXam': cmp3,
  };

  const logoFor = (exp: ExperienceItem, size = 64) =>
    companyLogos[exp.company] || exp.logo || exp.logoUrl || `https://picsum.photos/seed/logo-${encodeURIComponent(exp.company)}/${size}/${size}`;

  return (
    <section id="experience" className="py-20 px-4 bg-white dark:bg-gray-800" aria-labelledby="experience-heading">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 id="experience-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
        </div>

        {/* Layout */}
        <div className="grid gap-8 md:gap-12 md:[grid-template-columns:1fr_2fr]">
          {/* LEFT ORBIT */}
          <div>
            <div ref={orbitHostRef} className="relative h-[20rem] sm:h-[22rem] md:h-[22rem] lg:h-[28rem] mb-8 md:mb-0 overflow-visible">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Hub */}
                <div className="absolute w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-white text-center">
                    <div className="text-sm font-medium">6+ Years Experience</div>
                  </div>
                </div>

                {/* Orbit container */}
                <div className="relative" style={{ width: orbitSize, height: orbitSize }}>
                  {experience.map((exp, index) => {
                    const angle = (index * 360) / experience.length;
                    const rads = (angle * Math.PI) / 180;
                    const x = Math.cos(rads) * orbitRadius;
                    const y = Math.sin(rads) * orbitRadius;

                    return (
                      <button
                        key={exp.id}
                        data-experience-index={index}
                        onClick={() => handleExperienceSelect(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`absolute w-16 h-16 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                          selectedExperience === index
                            ? 'bg-white border-blue-600 scale-110 shadow-lg'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-105'
                        } ${prefersReducedMotion ? '' : 'hover:rotate-6'}`}
                        style={{
                          left: `calc(50% + ${x}px - ${BUTTON / 2}px)`,
                          top: `calc(50% + ${y}px - ${BUTTON / 2}px)`,
                          transform: prefersReducedMotion
                            ? 'scale(1)'
                            : `rotate(${-angle}deg) ${selectedExperience === index ? 'scale(1.1)' : ''}`,
                        }}
                        aria-label={`Select ${exp.company} experience`}
                        aria-pressed={selectedExperience === index}
                        title={exp.company}
                      >
                        <div className="w-full h-full flex items-center justify-center" style={{ transform: prefersReducedMotion ? 'none' : `rotate(${angle}deg)` }}>
                          <img
                            src={logoFor(exp, 64)}
                            alt={`${exp.company} logo`}
                            className={`w-10 h-10 object-contain rounded-xl ${
                              selectedExperience === index ? 'ring-2 ring-blue-600' : ''
                            }`}
                            loading="lazy"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="relative z-10">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} role="tabpanel" aria-labelledby={`experience-tab-${selectedExperience}`}>
              {experience[selectedExperience] && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 space-y-6">
                  <header>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {experience[selectedExperience].position}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <img
                          src={logoFor(experience[selectedExperience], 40)}
                          alt=""
                          className="w-5 h-5 object-contain rounded-md"
                          aria-hidden="true"
                        />
                        <span className="font-semibold">{experience[selectedExperience].company}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} aria-hidden="true" />
                          <span>{experience[selectedExperience].duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} aria-hidden="true" />
                          <span>{experience[selectedExperience].location}</span>
                        </div>
                      </div>
                    </div>
                  </header>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {experience[selectedExperience].description}
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2" role="list">
                      {experience[selectedExperience].achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience[selectedExperience].skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Screen-reader nav */}
        <div className="sr-only">
          <nav aria-label="Experience navigation">
            {experience.map((exp, index) => (
              <button key={exp.id} id={`experience-tab-${index}`} onClick={() => handleExperienceSelect(index)} aria-selected={selectedExperience === index} aria-controls="experience-panel">
                {exp.company} - {exp.position}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UniqueExperience;
