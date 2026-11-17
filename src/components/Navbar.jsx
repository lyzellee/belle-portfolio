import { useEffect, useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "designs", label: "DESIGNS" },
  { id: "certs", label: "CERTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contacts", label: "CONTACTS" },
];

// Should match the navbar height (plus a little breathing room)
const SCROLL_OFFSET = 120;

function Navbar() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;

      // If the user reached the bottom of the page, highlight the last section
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (reachedBottom) {
        setActiveId(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }

      let current = "";

      NAV_LINKS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;

        if (section.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = id;
        }
      });

      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <BootstrapNavbar className="portfolio-navbar" fixed="top" expand="lg">
      <Container fluid>
        {/* Your portfolio name */}
        <BootstrapNavbar.Brand href="#home" className="navbar-logo">
          Elyssa Belle Reambonanza
        </BootstrapNavbar.Brand>

        {/* Mobile menu toggle button */}
        <BootstrapNavbar.Toggle aria-controls="portfolio-nav" />

        {/* Navigation links */}
        <BootstrapNavbar.Collapse id="portfolio-nav">
          <Nav className="ms-auto navbar-links">
            {NAV_LINKS.map(({ id, label }) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                className={activeId === id ? "is-active" : ""}
                aria-current={activeId === id ? "true" : undefined}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
