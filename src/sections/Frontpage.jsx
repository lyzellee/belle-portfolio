import { useRef } from "react";
import "./Frontpage.css";
import profileImage from "../assets/frontpage-formal-pic.png";
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

const marqueeSkills = [
  { name: "HTML", logo: htmlLogo },
  { name: "CSS", logo: cssLogo },
  { name: "JavaScript", logo: javascriptLogo },
  { name: "React.js", logo: reactLogo },
  { name: "Next.js", logo: nextjsLogo },
  { name: "Laravel", logo: laravelLogo },
  { name: "Node.js", logo: nodejsLogo },
  { name: "Express.js", logo: expressLogo },
  { name: "MySQL", logo: mysqlLogo },
  { name: "MongoDB", logo: mongodbLogo },
  { name: "Figma", logo: figmaLogo },
  { name: "GitHub", logo: githubLogo },
];

function Frontpage() {
  const stageRef = useRef(null);

  // 3D tilt that follows the mouse
  const handleMouseMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stage.style.setProperty("--tilt-x", `${-y * 12}deg`);
    stage.style.setProperty("--tilt-y", `${x * 14}deg`);
  };

  const handleMouseLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <>
      <section className="frontpage" id="home">
        {/* Main hero section */}
        <div className="frontpage-content">
          <div className="frontpage-text">
            <p className="frontpage-eyebrow">
              FRONT-END DEVELOPER · UI/UX DESIGNER
            </p>

            <h1 className="frontpage-heading">
              <span>DESIGNING</span>
              <span>AND BUILDING</span>
              <span className="frontpage-highlight">DIGITAL</span>
              <span className="frontpage-highlight">EXPERIENCES.</span>
            </h1>

            <p className="frontpage-description">
              I create responsive, user-centered interfaces combining thoughtful
              design with clean frontend code.
            </p>
          </div>

          {/* Profile photo with animations */}
          <div
            className="frontpage-image-stage"
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="frontpage-image-float">
              <div className="frontpage-glow" aria-hidden="true" />
              <div className="frontpage-ring" aria-hidden="true" />

              {/* Orbiting chips */}
              <div className="frontpage-orbit" aria-hidden="true">
                <div className="orbit-chip orbit-chip-1">
                  <span>
                    <img src={reactLogo} alt="" />
                  </span>
                </div>
                <div className="orbit-chip orbit-chip-2">
                  <span>
                    <img src={figmaLogo} alt="" />
                  </span>
                </div>
                <div className="orbit-chip orbit-chip-3">
                  <span className="orbit-chip-code">&lt;/&gt;</span>
                </div>
              </div>

              <div className="frontpage-image-wrapper">
                <img
                  src={profileImage}
                  alt="Elyssa Belle Reambonanza"
                  className="frontpage-profile-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="skills-marquee" aria-label="Skills and technologies">
        <div className="skills-marquee-track">
          {[0, 1].map((group) => (
            <div
              className="skills-marquee-group"
              key={group}
              aria-hidden={group === 1}
            >
              {marqueeSkills.map((skill) => (
                <div
                  className="skills-marquee-item"
                  key={`${group}-${skill.name}`}
                >
                  <span>
                    <img src={skill.logo} alt="" />
                    {skill.name}
                  </span>
                  <i>✦</i>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Frontpage;
