/**
 * FIX ALL VENDOR SEO BLOCKS
 * Removes broken inline JSON-LD and replaces with valid Helmet blocks.
 */

import fs from "fs";
import path from "path";

const ROUTES = "./src/routes/";

const SEO_TEMPLATES = {
  verkada: {
    name: "Verkada Cloud Security",
    brand: "Verkada",
    category: "Cloud Surveillance",
  },
  avigilon: {
    name: "Avigilon Security Systems",
    brand: "Avigilon",
    category: "Video Surveillance",
  },
  alta: {
    name: "Openpath / Avigilon Alta Access Control",
    brand: "Openpath",
    category: "Access Control",
  },
  siklu: {
    name: "Siklu Wireless Backhaul",
    brand: "Siklu",
    category: "Wireless Infrastructure",
  },
  unifi: {
    name: "Ubiquiti UniFi Networks",
    brand: "Ubiquiti",
    category: "Networking",
  },
  halo: {
    name: "HALO Vape Sensor",
    brand: "HALO",
    category: "Environmental Sensors",
  },
};

const VENDOR_MAP = [
  { key: "verkada", match: /verk/i },
  { key: "avigilon", match: /avig/i },
  { key: "alta", match: /(alta|openpath)/i },
  { key: "siklu", match: /siklu/i },
  { key: "unifi", match: /(unifi|ubiquiti)/i },
  { key: "halo", match: /halo/i },
];

function createJsonLdBlock(vendorKey) {
  const d = SEO_TEMPLATES[vendorKey];

  return `
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${d.name}",
      "brand": "${d.brand}",
      "category": "${d.category}",
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
    })
  }}
></script>
`;
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const lower = filePath.toLowerCase();

  const vendor = VENDOR_MAP.find(v => v.match.test(lower));
  if (!vendor) return;

  console.log("Fixing:", filePath);

  // Remove incorrectly injected broken blocks
  content = content.replace(
    /<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi,
    ""
  );

  content = content.replace(
    /dangerouslySetInnerHTML[\s\S]*?<\/script>/gi,
    ""
  );

  // Inject correct script after <Helmet>
  content = content.replace(
    /<Helmet>/i,
    `<Helmet>\n${createJsonLdBlock(vendor.key)}\n`
  );

  fs.writeFileSync(filePath, content, "utf8");
}

function run() {
  const files = fs.readdirSync(ROUTES);

  files.forEach(file => {
    if (file.endsWith(".jsx") || file.endsWith(".tsx")) {
      fixFile(path.join(ROUTES, file));
    }
  });

  console.log("Vendor SEO cleanup complete.");
}

run();
