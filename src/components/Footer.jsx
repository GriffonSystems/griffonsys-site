import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 py-10">
      {/* LocalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Griffon Systems, Inc.",
            image: "https://www.griffonsys.com/logo.png",
            url: "https://www.griffonsys.com",
            telephone: "+16306070346",
            address: {
              "@type": "PostalAddress",
              streetAddress: "650 West Grand Ave #206",
              addressLocality: "Elmhurst",
              addressRegion: "IL",
              postalCode: "60126",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 08:00-17:00",
            priceRange: "$$",
            geo: {
              "@type": "GeoCoordinates",
              latitude: "41.908517",
              longitude: "-87.952383",
            },
            sameAs: [
              "https://www.linkedin.com/company/griffon-systems-inc/"
            ],
          }),
        }}
      />

      <div className="container mx-auto px-6 text-sm">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Griffon Systems, Inc.</h3>
            <p>650 West Grand Ave #206</p>
            <p>Elmhurst, IL 60126</p>
            <p>
              <a
                href="tel:16306070346"
                className="text-blue-400 hover:underline"
              >
                (630) 607-0346
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Hours</h3>
            <p>Monday–Friday: 8:00 AM – 5:00 PM</p>
            <p>Closed Saturday & Sunday</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
            <p>
              <a
                href="https://www.linkedin.com/company/griffon-systems-inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a
                href="mailto:info@griffonsys.com"
                className="text-blue-400 hover:underline"
              >
                info@griffonsys.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Griffon Systems, Inc. — All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
