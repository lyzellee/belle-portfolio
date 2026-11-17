import "./Designs.css";
import fordTractor from "../assets/designs/ford-tractor.png";
import strawberryMatcha from "../assets/designs/strawberry-matcha.png";
import pinoyBurger from "../assets/designs/pinoy-burger.png";

function Designs() {
  const designs = [
    { src: fordTractor, alt: "Ford tractor promotional poster" },
    { src: strawberryMatcha, alt: "Strawberry matcha promotional poster" },
    { src: pinoyBurger, alt: "Pinoy Burger promotional poster" },
  ];

  return (
    <section className="designs-section" id="designs">
      <div className="designs-container">
        <div className="designs-heading-row">
          <h2>DESIGNS</h2>
          <p>Sample Posters</p>
        </div>

        <div className="designs-grid">
          {designs.map((design) => (
            <figure className="design-card" key={design.alt}>
              <img src={design.src} alt={design.alt} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Designs;
