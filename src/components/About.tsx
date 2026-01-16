import React from "react";
import { CheckCircle } from "lucide-react";
import content from "../data/content.json";

type AboutContent = {
  bio?: string;
  bioParas?: string[];
  highlights?: string[];
};

const About: React.FC = () => {
  const { about } = content as { about: AboutContent };

  const PRIMARY_TEXT =
    "Led development of 15+ production applications serving 100K+ users";

  const highlights = Array.isArray(about?.highlights) ? about.highlights : [];

  // Put the primary first, then the rest — but all rendered the same way.
  const sortedHighlights = [
    ...highlights.filter((h) => h.includes(PRIMARY_TEXT)),
    ...highlights.filter((h) => !h.includes(PRIMARY_TEXT)),
  ];

  // Bio: support both formats
  const bioParas: string[] = Array.isArray(about?.bioParas)
    ? about.bioParas
    : typeof about?.bio === "string"
    ? about.bio
        .split(/\n\n+/) // split by blank lines
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  // One shared class so nothing drifts at different breakpoints
  const cardClasses =
    "flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 w-full";
  const iconClasses =
    "text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5";

  return (
    <section id="about" className="py-20 px-4" aria-labelledby="about-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Bio */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bioParas.length > 0 ? (
                bioParas.map((para, idx) => (
                  <p
                    key={`bio-${idx}`}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {/* fallback if bio is missing */}
                  I build scalable, secure cloud-native backend systems with a
                  focus on performance, reliability, and clean architecture.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Key Highlights */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Key Highlights
            </h3>

            <ul className="space-y-4" role="list">
              {sortedHighlights.map((highlight, i) => (
                <li key={`${i}-${highlight}`} className={cardClasses}>
                  <CheckCircle
                    size={24}
                    className={iconClasses}
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
