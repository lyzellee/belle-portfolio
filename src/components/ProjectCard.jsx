import { useEffect, useRef, useState } from "react";

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 810;

function LivePreview({ url, title }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const updateScale = () => setScale(element.clientWidth / PREVIEW_WIDTH);
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-live-preview" ref={containerRef}>
      <iframe
        src={url}
        title={`${title} live preview`}
        className="project-live-frame"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${scale})`,
        }}
        loading="lazy"
        tabIndex={-1}
      />
      <a
        className="project-live-overlay"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live site`}
      >
        <span className="project-live-badge">Visit live site ↗</span>
      </a>
    </div>
  );
}

function ProjectCard({ project }) {
  const [activeImage, setActiveImage] = useState(0);
  const hasLivePreview = Boolean(project.link);

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === 0 ? project.images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % project.images.length);
  };

  useEffect(() => {
    if (hasLivePreview || project.images.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % project.images.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [hasLivePreview, project.images.length]);

  return (
    <article className="project-card">
      <div className="project-image-column">
        <div className="project-carousel">
          {hasLivePreview ? (
            <LivePreview url={project.link} title={project.title} />
          ) : (
            <>
              {project.images.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`project-carousel-image ${
                    index === activeImage ? "active" : ""
                  }`}
                />
              ))}

              {project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="project-carousel-arrow project-carousel-arrow-prev"
                    aria-label="Previous project screenshot"
                    onClick={showPreviousImage}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="project-carousel-arrow project-carousel-arrow-next"
                    aria-label="Next project screenshot"
                    onClick={showNextImage}
                  >
                    ›
                  </button>
                </>
              )}

              <div
                className="project-carousel-dots"
                aria-label="Project screenshots"
              >
                {project.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={index === activeImage ? "active" : ""}
                    aria-label={`Show ${image.alt}`}
                    aria-current={index === activeImage ? "true" : undefined}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {project.note && <p className="project-note">{project.note}</p>}
      </div>

      <div className="project-details">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tags" aria-label="Technologies used">
          {project.tags.map((tag, index) => (
            <span key={typeof tag === "string" ? tag : tag.name}>
              <span className="project-tag-icon">
                {typeof tag === "string" ? (
                  index === 0 ? (
                    "⚛"
                  ) : index === 1 ? (
                    "N"
                  ) : (
                    "L"
                  )
                ) : tag.icon ? (
                  tag.icon
                ) : (
                  <img src={tag.logo} alt="" />
                )}
              </span>
              {typeof tag === "string" ? tag : tag.name}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            className="project-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View live site ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
