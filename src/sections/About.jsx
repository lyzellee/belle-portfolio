import "./About.css";
import graduationPortrait from "../assets/graduation-portrait.jpg";
import pupLogo from "../assets/pup-logo.png";

function About() {
  return (
    <section className="about-section" id="about">
      {/* About page content */}
      <div className="about-container">
        <p className="about-label">ABOUT</p>

        <div className="about-main">
          {/* Introduction */}
          <div className="about-text">
            <h1>
              I'm a <span>front end developer</span> and{" "}
              <span>UI/UX designer</span> who turns ideas into{" "}
              <span>clean, intuitive digital experiences</span>. I build{" "}
              <span>responsive interfaces</span> with a focus on{" "}
              <span>usability, details, and functionality.</span> With knowledge
              of <span>back end development</span> and{" "}
              <span>administrative workflows,</span> I bring both technical and
              organizational thinking into every project.
            </h1>
          </div>

          {/* Graduation photo */}
          <div className="about-image-wrapper">
            <img
              src={graduationPortrait}
              alt="Elyssa Belle Reambonanza at graduation"
              className="about-image"
            />
          </div>
        </div>

        {/* Education information */}
        <div className="about-education">
          <div className="about-school-logo">
            <img
              src={pupLogo}
              alt="Polytechnic University of the Philippines logo"
            />
          </div>

          <div className="about-education-details">
            <h2>Diploma in Information Technology</h2>

            <p>
              POLYTECHNIC UNIVERSITY OF THE PHILIPPINES
              <span className="about-separator">·</span>
              PRESIDENT'S LISTER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
