import { useEffect, useState } from "react";
import "./LandingLoader.css";

function LandingLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const startedAt = performance.now();
    let frameId;
    let exitDelayId;
    let hiddenDelayId;

    document.body.style.overflow = "hidden";

    const updateProgress = (now) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        exitDelayId = window.setTimeout(() => setExiting(true), 220);
        hiddenDelayId = window.setTimeout(() => {
          document.body.style.overflow = "";
          setHidden(true);
        }, 1050);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(exitDelayId);
      window.clearTimeout(hiddenDelayId);
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`landing-loader${exiting ? " is-exiting" : ""}`} aria-label="Loading portfolio">
      <div className="landing-loader-center">
        <h1>Elyssa Belle Reambonanza</h1>
        <div className="landing-loader-progress" aria-live="polite">
          {progress}
        </div>
      </div>
    </div>
  );
}

export default LandingLoader;
