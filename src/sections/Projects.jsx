import "./Projects.css";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-heading-row">
          <h2>PROJECTS</h2>
          <p>{String(projects.length).padStart(2, "0")} Projects</p>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
