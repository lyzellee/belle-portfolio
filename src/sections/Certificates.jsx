import { useEffect, useState } from "react";
import "./Certificates.css";
import visualGraphicsCertificate from "../assets/certificates/visual-graphics-design-nc-iii.png";
import computerServicingCertificate from "../assets/certificates/computer-system-servicing-nc-ii.png";
import tesdaLogo from "../assets/certificates/tesda-logo.png";

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      number: "01",
      title: "Visual Graphics Design NC III",
      certificateNo: "25131103024198",
      image: visualGraphicsCertificate,
      imageAlt: "National Certificate III in Visual Graphics Design",
    },
    {
      number: "02",
      title: "Computer System Servicing NC II",
      certificateNo: "24131402021336",
      image: computerServicingCertificate,
      imageAlt: "National Certificate II in Computer Systems Servicing",
    },
  ];

  useEffect(() => {
    if (!selectedCertificate) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  const handleRowKeyDown = (event, certificate) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedCertificate(certificate);
    }
  };

  return (
    <section className="certificates-section" id="certs">
      <div className="certificates-container">
        <div className="certificates-heading-row">
          <h2>CERTIFICATES</h2>
        </div>

        <div className="certificates-list">
          {certificates.map((certificate) => (
            <article
              className="certificate-row"
              key={certificate.number}
              role="button"
              tabIndex={0}
              aria-label={`View ${certificate.title} certificate`}
              onClick={() => setSelectedCertificate(certificate)}
              onKeyDown={(event) => handleRowKeyDown(event, certificate)}
            >
              <span className="certificate-number">{certificate.number}</span>

              <div className="certificate-main">
                <div className="certificate-seal" aria-hidden="true">
                  <img src={tesdaLogo} alt="" />
                </div>
                <div>
                  <h3>{certificate.title}</h3>
                  <p>
                    Certificate No <strong>{certificate.certificateNo}</strong>
                  </p>
                </div>
              </div>

              {/* Visual indicator only — the whole row is the click target */}
              <span className="certificate-view-button" aria-hidden="true">
                +
              </span>
            </article>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="certificate-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setSelectedCertificate(null);
          }}
        >
          <div
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
          >
            <button
              type="button"
              className="certificate-modal-close"
              aria-label="Close certificate"
              onClick={() => setSelectedCertificate(null)}
            >
              ×
            </button>
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.imageAlt}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;
