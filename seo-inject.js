/**
 * SEO AUTO-INJECT SCRIPT (React Safe)
 * Inserts JSON-LD into vendor pages inside <Helmet>.
 */

import fs from "fs";
import path from "path";

const ROUTES_DIR = "./src/routes/";

// Utility: wrap JSON-LD safely for JSX
function wrapJSONLD(json) {
  return `
    <script type="application/ld+json">
    {\\`
${json}
    \\`}
    </script>
  `;
}

// ----------- PRETTY JSON-LD BLOCKS --------------
const SEO_BLOCKS = {
  avigilon: wrapJSONLD(`
{
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
}
`),

  verkada: wrapJSONLD(`
{
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
}
`),

  alta: wrapJSONLD(`
{
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
}
`),

  siklu: wrapJSONLD(`
{
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
}
`),

  unifi: wrapJSONLD(`
{
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
}
`),

  halo: wrapJSONLD(`
{
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
`)
};

// Detect vendor by filename
const VENDOR_MAP = [
  { key: "avigilon", match: /avig/ },
  { key: "verkada", match: /verk/ },
  { key: "alta", match: /(alta|openpath)/ },
  { key: "siklu", match: /siklu/ },
  { key: "unifi", match: /(unifi|ubiquiti)/ },
  { key: "halo", match: /halo/ }
];

// ---------------- PROCESS FILE ------------------
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const fileName = path.basename(filePath).toLowerCase();
  const vendor = VENDOR_MAP.find(v => v.match.test(fileName));
  if (!vendor) return;

  console.log(`Injecting SEO into: ${fileName}`);

  const seoBlock = SEO_BLOCKS[vendor.key];

  // Prevent duplicate injection
  if (content.includes("@context") || content.includes("application/ld+json")) {
    console.log(`Already injected: ${fileName}`);
    return;
  }

  if (content.includes("<Helmet>")) {
    content = content.replace("<Helmet>", `<Helmet>\n${seoBlock}\n`);
  } else {
    // Insert Helmet if missing
    content = content.replace(
      "export default function",
      `<Helmet>${seoBlock}</Helmet>\n\nexport default function`
    );
  }

  fs.writeFileSync(filePath, content, "utf8");
}

function scanRoutes() {
  const files = fs.readdirSync(ROUTES_DIR);
  files.forEach(file => {
    if (file.endsWith(".jsx") || file.endsWith(".tsx")) {
      processFile(path.join(ROUTES_DIR, file));
    }
  });
}

scanRoutes();
console.log("✅ SEO injection complete.");
