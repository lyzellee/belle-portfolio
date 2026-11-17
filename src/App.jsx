import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import Navbar from "./components/Navbar.jsx";
import LandingLoader from "./components/LandingLoader.jsx";
import Frontpage from "./sections/Frontpage.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Designs from "./sections/Designs.jsx";
import Certificates from "./sections/Certificates.jsx";
import Skills from "./sections/Skills.jsx";
import Contact from "./sections/Contact.jsx";

function App() {
  useEffect(() => {
    const selectors = [
      ".frontpage-text",
      ".frontpage-image-wrapper",
      ".skills-marquee",
      ".about-label",
      ".about-text",
      ".about-image-wrapper",
      ".about-education",
      ".projects-heading-row",
      ".project-card",
      ".experience-heading-row",
      ".experience-item",
      ".designs-heading-row",
      ".design-card",
      ".certificates-heading-row",
      ".certificate-row",
      ".skills-heading-row",
      ".skills-panel",
      ".skill-row",
      ".skill-item",
      ".contact-eyebrow",
      ".contact-heading-row",
      ".contact-socials",
    ];

    const sections = Array.from(document.querySelectorAll("main > section"));

    sections.forEach((section, sectionIndex) => {
      section.classList.add("section-reveal", "reveal-ready");

      const items = Array.from(section.querySelectorAll(selectors.join(",")));
      items.forEach((item, itemIndex) => {
        item.classList.add("reveal-item");

        const cardIndex =
          item.className.includes("project-card") ||
          item.className.includes("design-card") ||
          item.className.includes("experience-item") ||
          item.className.includes("certificate-row") ||
          item.className.includes("skill-row")
            ? Array.from(item.parentElement?.children || []).indexOf(item)
            : itemIndex;

        item.style.setProperty(
          "--reveal-delay",
          `${Math.min(cardIndex * 90 + sectionIndex * 20, 420)}ms`
        );
      });

      if (section.id === "home") {
        window.requestAnimationFrame(() => section.classList.add("is-visible"));
      }
    });

    const marquee = document.querySelector(".skills-marquee");
    if (marquee) marquee.classList.add("reveal-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => {
      if (section.id !== "home") observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <LandingLoader />
      <Navbar />

      <main>
        <Frontpage />
        <About />
        <Projects />
        <Experience />
        <Designs />
        <Certificates />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default App;
