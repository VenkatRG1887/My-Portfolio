import React from "react";
import content from "../data/content.json";

type Skill = {
  name: string;
  icon: string; // raw SVG markup
  proficiency: "Expert" | "Advanced" | "Intermediate" | string;
};

const SkillsGrid: React.FC = () => {
  // Normalize: strip any "note" field the JSON might carry
  const skills = (content as unknown as { skills: any[] }).skills.map(
    ({ note, ...rest }) => rest as Skill
  );

  const getProficiencyColor = (level: string) => {
    switch ((level || "").toLowerCase()) {
      case "expert":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700";
      case "advanced":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700";
      case "intermediate":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div
      className="flex flex-col items-center p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 border-transparent
                 transition-all duration-200 hover:scale-[1.02] hover:border-blue-500 dark:hover:border-blue-400
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-900
                 select-none h-full min-h-[170px]"  /* ensures badge never overlaps name */
      role="button"
      tabIndex={0}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-blue-600 dark:text-blue-400 shrink-0 mb-3"
        dangerouslySetInnerHTML={{ __html: (skill as any).icon }}
        aria-hidden="true"
      />

      {/* Name — fixed vertical space so long names wrap without pushing into the badge */}
      <h3 className="text-center font-semibold text-sm text-gray-900 dark:text-white leading-snug mb-2
                     min-h-[1.9rem] break-words px-1">
        {skill.name}
      </h3>

      {/* Badge sticks at the bottom naturally */}
      <span
        className={[
          "mt-auto inline-block w-full text-center px-2 py-1 text-[11px] font-medium rounded-full border",
          getProficiencyColor(skill.proficiency),
        ].join(" ")}
      >
        {skill.proficiency}
      </span>
    </div>
  );

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-white dark:bg-gray-800"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="skills-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
        </div>

        {/* One responsive grid — prevents squeezing on mobile/tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
