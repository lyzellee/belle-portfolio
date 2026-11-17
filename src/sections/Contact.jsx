import { useEffect, useRef } from "react";
import "./Contact.css";

const EMAIL = "lyssabeller@gmail.com";
const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
  "Hello Belle!",
)}`;
const COLORS = [
  "#183C4B",
  "#2F7F95",
  "#D8A600",
  "#F2C94C",
  "#E85D75",
  "#7BC8D9",
];

// How long the fireworks play before Gmail opens (ms)
const OPEN_MAIL_DELAY = 1400;

// Opens a NEW tab immediately on click (browsers allow this),
// plays fireworks inside it, then sends that tab to Gmail.
function openFireworksTab() {
  const tab = window.open("", "_blank");
  if (!tab) return false; // popup blocked

  tab.document.write(`<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<title>Opening Gmail...</title>
<style>
  html, body { margin: 0; height: 100%; background: #F3EDEF; overflow: hidden; font-family: Arial, Helvetica, sans-serif; }
  canvas { position: fixed; inset: 0; }
  p { position: fixed; left: 0; right: 0; top: 50%; margin: 0; text-align: center; color: #183C4B; font-weight: 700; letter-spacing: 3px; font-size: 14px; }
</style>
</head>
<body>
<p>OPENING GMAIL...</p>
<canvas id="c"></canvas>
<script>
var c = document.getElementById("c");
var x = c.getContext("2d");
var W = (c.width = innerWidth);
var H = (c.height = innerHeight);
var P = [];
var C = ${JSON.stringify(COLORS)};

function burst(a, b) {
  var col = C[Math.floor(Math.random() * C.length)];
  for (var i = 0; i < 70; i++) {
    var an = (Math.PI * 2 * i) / 70;
    var s = 2 + Math.random() * 5.5;
    P.push({ x: a, y: b, vx: Math.cos(an) * s, vy: Math.sin(an) * s, a: 1, d: 0.011 + Math.random() * 0.012, z: 1.5 + Math.random() * 2, c: col });
  }
}

burst(W / 2, H / 2);
[[180, -0.25, -0.2], [360, 0.25, -0.25], [540, -0.1, 0.2], [720, 0.3, 0.1], [900, -0.3, 0.05]].forEach(function (o) {
  setTimeout(function () { burst(W / 2 + o[1] * W, H / 2 + o[2] * H); }, o[0]);
});

function tick() {
  x.clearRect(0, 0, W, H);
  P = P.filter(function (p) { return p.a > 0; });
  P.forEach(function (p) {
    var px = p.x, py = p.y;
    p.vx *= 0.985;
    p.vy = p.vy * 0.985 + 0.06;
    p.x += p.vx;
    p.y += p.vy;
    p.a -= p.d;
    x.globalAlpha = Math.max(p.a, 0);
    x.strokeStyle = p.c;
    x.lineWidth = p.z;
    x.lineCap = "round";
    x.beginPath();
    x.moveTo(px, py);
    x.lineTo(p.x, p.y);
    x.stroke();
  });
  requestAnimationFrame(tick);
}
tick();

setTimeout(function () { location.replace(${JSON.stringify(GMAIL_URL)}); }, ${OPEN_MAIL_DELAY});
<\/script>
</body>
</html>`);
  tab.document.close();
  return true;
}

function Contact() {
  const canvasRef = useRef(null);
  const arrowRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);
  const endAtRef = useRef(0);
  const timeoutsRef = useRef([]);
  const busyRef = useRef(false);

  // Clean up animation + timers when leaving the page
  useEffect(() => {
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const addBurst = (x, y) => {
    const count = 70;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const accent = COLORS[Math.floor(Math.random() * COLORS.length)];

    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 2 + Math.random() * 5.5;

      particlesRef.current.push({
        x,
        y,
        px: x,
        py: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.011 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 2,
        color: i % 3 === 0 ? accent : color,
      });
    }
  };

  const startLoop = (canvas) => {
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      particlesRef.current.forEach((p) => {
        p.px = p.x;
        p.py = p.y;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.06; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      if (
        particlesRef.current.length > 0 ||
        performance.now() < endAtRef.current
      ) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
        frameRef.current = 0;
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
  };

  // Fireworks on this page (used only as a backup if the new tab is blocked)
  const launchFireworks = () => {
    const canvas = canvasRef.current;
    const arrow = arrowRef.current;
    if (!canvas || !arrow) return;

    if (!frameRef.current) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const rect = arrow.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    endAtRef.current = performance.now() + OPEN_MAIL_DELAY;

    addBurst(originX, originY);

    [
      { delay: 180, dx: -220, dy: -120 },
      { delay: 360, dx: 200, dy: -150 },
      { delay: 540, dx: -90, dy: 110 },
      { delay: 720, dx: 280, dy: 60 },
      { delay: 900, dx: -300, dy: 40 },
    ].forEach(({ delay, dx, dy }) => {
      const id = window.setTimeout(() => {
        addBurst(
          Math.min(Math.max(originX + dx, 40), window.innerWidth - 40),
          Math.min(Math.max(originY + dy, 40), window.innerHeight - 40),
        );
      }, delay);
      timeoutsRef.current.push(id);
    });

    if (!frameRef.current) startLoop(canvas);
  };

  const handleArrowClick = (event) => {
    event.preventDefault();
    if (busyRef.current) return;
    busyRef.current = true;

    // Must happen right now, during the click, so the browser allows the new tab
    const opened = openFireworksTab();

    if (!opened) {
      // Popup blocked: play fireworks here, then go to Gmail in this tab
      launchFireworks();
      const id = window.setTimeout(() => {
        window.location.href = GMAIL_URL;
      }, OPEN_MAIL_DELAY);
      timeoutsRef.current.push(id);
    }

    const resetId = window.setTimeout(() => {
      busyRef.current = false;
    }, OPEN_MAIL_DELAY + 500);
    timeoutsRef.current.push(resetId);
  };

  return (
    <section className="contact-section" id="contacts">
      <canvas
        ref={canvasRef}
        className="contact-fireworks"
        aria-hidden="true"
      />

      <div className="contact-container">
        <p className="contact-eyebrow">Front-End Developer · UI/UX Designer</p>

        <div className="contact-heading-row">
          <h2 className="contact-heading">LET&apos;S BUILD</h2>

          <a
            ref={arrowRef}
            className="contact-arrow"
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleArrowClick}
            aria-label={`Send an email to ${EMAIL}`}
            title={`Email me: ${EMAIL}`}
          />
        </div>

        <nav className="contact-socials" aria-label="Social links">
          <a
            href="https://github.com/lyzellee"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/elyssa-belle-reambonanza/"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.facebook.com/elyssabelle.reambonanza"
            target="_blank"
            rel="noreferrer"
          >
            FB
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Contact;
