/**
 * SEO AUTO-INJECT SCRIPT — JSX SAFE VERSION
 * Injects JSON-LD blocks inside <Helmet> for vendor pages.
 */

import fs from "fs";
import path from "path";

const ROUTES_DIR = "./src/routes/";

// ------- JSON LD BLOCKS (stringified) -------
const JSONLD = {
  avigilon: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Avigilon Security Systems",
    "brand": "Avigilon",
    "category": "Video Surveillance",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  },

  verkada: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Verkada Cloud Security",
    "brand": "Verkada",
    "category": "Cloud Surveillance",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  },

  alta: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Openpath / Avigilon Alta Access Control",
    "brand": "Openpath",
    "category": "Access Control",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  },

  siklu: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Siklu Wireless Backhaul",
    "brand": "Siklu",
    "category": "Wireless Infrastructure",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  },

  unifi: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ubiquiti UniFi Networks",
    "brand": "Ubiquiti",
    "category": "Networking",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  },

  halo: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "HALO Vape Sensor",
    "brand": "IPVideo HALO",
    "category": "Environmental Sensors",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Griffon Systems, Inc.",
      "telephone": "630-607-0346",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "650 West Grand Ave #206",
        "addressLocality": "Elmhurst",
        "addressRegion": "IL",
        "postalCode": "60126",
        "addressCountry": "US"
      }
    },
    "areaServed": "Illinois"
  }
};

// ---------- Vendor filename detection ----------
const VENDOR_MAP = [
  { key: "avigilon", match: /avig/i },
  { key: "verkada", match: /verk/i },
  { key: "alta", match: /(alta|openpath)/i },
  { key: "siklu", match: /siklu/i },
  { key: "unifi", match: /(unifi|ubiquiti)/i },
  { key: "halo", match: /halo/i }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const filename = path.basename(filePath).toLowerCase();

  const vendor = VENDOR_MAP.find(v => v.match.test(filename));
  if (!vendor) return;

  console.log("Injecting SEO into:", filename);

  const jsonStr = JSON.stringify(JSONLD[vendor.key], null, 2);

  const jsSafeScript = `
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: \`${jsonStr}\` }}
    />
  `;

  // Inject RIGHT AFTER <Helmet>
  if (content.includes("<Helmet>")) {
    content = content.replace("<Helmet>", `<Helmet>\n${jsSafeScript}\n`);
  }

  fs.writeFileSync(filePath, content, "utf8");
}

function run() {
  const files = fs.readdirSync(ROUTES_DIR);
  files.forEach(f => {
    if (f.endsWith(".jsx") || f.endsWith(".tsx")) {
      processFile(path.join(ROUTES_DIR, f));
    }
  });
}

run();
console.log("SEO injection complete.");
