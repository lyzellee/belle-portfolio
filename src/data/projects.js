const sentinelImageModules = import.meta.glob(
  "../assets/projects/sentinel/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const legaciImageModules = import.meta.glob(
  "../assets/projects/legaci/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const shoeStoreImageModules = import.meta.glob(
  "../assets/projects/shoe-store/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

import reactLogo from "../assets/projects/sentinel/logos/react.png";
import nextjsLogo from "../assets/projects/sentinel/logos/nextjs.png";
import laravelLogo from "../assets/projects/sentinel/logos/laravel.png";
import htmlLogo from "../assets/projects/legaci/logos/html.png";
import cssLogo from "../assets/projects/legaci/logos/css.png";
import javascriptLogo from "../assets/projects/legaci/logos/javascript.png";
import nodejsLogo from "../assets/projects/shoe-store/logos/nodejs.png";
import expressLogo from "../assets/projects/shoe-store/logos/express.png";
import mongodbLogo from "../assets/projects/shoe-store/logos/mongodb.png";

const naturalSort = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const sentinelImages = Object.entries(sentinelImageModules)
  .sort(([a], [b]) => naturalSort(a, b))
  .map(([path, src], index) => ({
    src,
    alt: `Sentinel project screenshot ${index + 1}`,
  }));

const legaciImages = Object.entries(legaciImageModules)
  .sort(([a], [b]) => naturalSort(a, b))
  .map(([path, src], index) => ({
    src,
    alt: `LEGACI project screenshot ${index + 1}`,
  }));

const shoeStoreImages = Object.entries(shoeStoreImageModules)
  .sort(([a], [b]) => naturalSort(a, b))
  .map(([path, src], index) => ({
    src,
    alt: `Shoe Web Store project screenshot ${index + 1}`,
  }));

export const projects = [
  {
    title: "SENTINEL",
    description:
      "A web-based RFID door lock access control system that uses RFID technology to manage, monitor, and secure door access for authorized users.",
    tags: [
      { name: "React", logo: reactLogo },
      { name: "Next.js", logo: nextjsLogo },
      { name: "Laravel", logo: laravelLogo },
    ],
    note: "Note: Due to a Non-Disclosure Agreement (NDA), the full system and additional project details cannot be publicly disclosed.",
    images: sentinelImages,
  },
  {
    title: "LEGACI",
    description:
      "LEGACI (Experience Quantum Treasury) is an integrated treasury management system designed to manage an organization's financial assets and streamline treasury operations through accuracy, reliability, security, and innovative technology.",
    tags: [
      { name: "Html", logo: htmlLogo },
      { name: "Css", logo: cssLogo },
      { name: "JavaScript", logo: javascriptLogo },
    ],
    images: legaciImages,
  },
  {
    title: "SHOE WEB STORE",
    description:
      "A full-stack e-commerce platform that allows customers to browse, explore, and purchase footwear across different categories, with features for product details, shopping carts, and wishlists.",
    tags: [
      { name: "React", logo: reactLogo },
      { name: "Next.js", logo: nextjsLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "Node.js", logo: nodejsLogo },
      { name: "Express.js", logo: expressLogo },
      { name: "MongoDB", logo: mongodbLogo },
    ],
    link: "https://shoe-website-beige-rho.vercel.app/",
    images: shoeStoreImages,
  },
];