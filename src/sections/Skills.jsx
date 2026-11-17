import "./Skills.css";
import htmlLogo from "../assets/projects/legaci/logos/html.png";
import cssLogo from "../assets/projects/legaci/logos/css.png";
import javascriptLogo from "../assets/projects/legaci/logos/javascript.png";
import reactLogo from "../assets/projects/sentinel/logos/react.png";
import nextjsLogo from "../assets/skills/nextjs.svg";
import laravelLogo from "../assets/projects/sentinel/logos/laravel.png";
import nodejsLogo from "../assets/projects/shoe-store/logos/nodejs.png";
import expressLogo from "../assets/projects/shoe-store/logos/express.png";
import mongodbLogo from "../assets/projects/shoe-store/logos/mongodb.png";
import figmaLogo from "../assets/skills/figma.png";
import githubLogo from "../assets/skills/github.png";
import mysqlLogo from "../assets/skills/mysql.png";

function Skills() {
  const skillGroups = [
    {
      category: "Languages",
      items: [
        { name: "Html", logo: htmlLogo },
        { name: "Css", logo: cssLogo },
        { name: "JavaScript", logo: javascriptLogo },
      ],
    },
    {
      category: "Web Development",
      items: [
        { name: "React.js", logo: reactLogo },
        { name: "Next.js", logo: nextjsLogo },
        { name: "Laravel", logo: laravelLogo },
      ],
    },
    {
      category: "Backend & APIs",
      items: [
        { name: "Node.js", logo: nodejsLogo },
        { name: "Express.js", logo: expressLogo },
        "API Testing",
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "MySQL", logo: mysqlLogo },
        { name: "MongoDB", logo: mongodbLogo },
      ],
    },
    {
      category: "UI/UX & Design",
      items: [
        { name: "Figma", logo: figmaLogo },
        "Wireframing",
        "Prototyping",
        "UI/UX Design",
      ],
    },
    {
      category: "IT Support",
      items: [
        "Hardware Troubleshooting",
        "Software Installation",
        "Network Troubleshooting",
        "Testing & Debugging",
      ],
    },
    {
      category: "Tools & Workflow",
      items: [
        { name: "GitHub", logo: githubLogo },
        "VS Code",
        "Vercel",
        "Render",
        "Adobe Illustrator",
        "Canva",
        "Microsoft Offices",
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-heading-row">
          <h2>SKILLS</h2>
        </div>

        <div className="skills-panel">
          {skillGroups.map((group) => (
            <div className="skill-row" key={group.category}>
              <div className="skill-category">{group.category}</div>
              <div className="skill-items">
                {group.items.map((item) => {
                  const itemName = typeof item === "string" ? item : item.name;
                  return (
                    <span className="skill-item" key={itemName}>
                      {typeof item === "object" && item.logo && (
                        <img
                          src={item.logo}
                          alt=""
                          className={
                            itemName === "Next.js"
                              ? "skill-logo-original"
                              : undefined
                          }
                        />
                      )}
                      {itemName}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
