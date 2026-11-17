import { useEffect } from "react";
import "./Experience.css";

function Experience() {
  useEffect(() => {
    const timeline = document.querySelector(".experience-timeline");
    if (!timeline) return undefined;

    let frameId = 0;

    const updateTimelineProgress = () => {
      frameId = 0;
      const rect = timeline.getBoundingClientRect();
      const viewportProgress = window.innerHeight * 0.72;
      const traveled = viewportProgress - rect.top;
      const progress = Math.max(0, Math.min(1, traveled / (rect.height + viewportProgress)));
      timeline.style.setProperty("--timeline-progress", `${progress * 100}%`);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateTimelineProgress);
    };

    updateTimelineProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const experiences = [
    {
      date: "March 2026 - May 2026",
      title: "Front End Developer Intern",
      company: "Comfac Global Group",
      description:
        "Developed responsive user interfaces using Reactjs, Next.js, and Laravel Filament based on Figma UI/UX designs, managed code using GitHub, collaborated with team members to meet project deadlines, performed debugging and website testing to resolve technical issues, and prepared technical documentation for development processes, testing, and system procedures.",
    },
    {
      date: "July 2025 - Sept 2025",
      title: "Administrative IT Intern",
      company: "Tantoco Brands Enterprises",
      description:
        "Managed sales, collection, and disbursement records using Microsoft Excel to ensure accuracy, organized and digitized business documents while maintaining email records, and assisted with computer setup, printer connections, and basic hardware and office peripherals troubleshooting.",
    },
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-heading-row">
          <h2>EXPERIENCE</h2>
        </div>

        <div className="experience-timeline">
          {experiences.map((experience) => (
            <article className="experience-item" key={experience.title}>
              <p className="experience-date">{experience.date}</p>
              <div>
                <div className="experience-title-row">
                  <h3>{experience.title}</h3>
                  <span className="experience-company">{experience.company}</span>
                </div>
                <p>{experience.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
