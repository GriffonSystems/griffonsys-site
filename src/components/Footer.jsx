import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 mt-16 py-10 relative">
      {/* --- LocalBusiness Schema for SEO --- */}
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
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* --- Column 1: Address & Map --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Griffon Systems, Inc.
            </h3>
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

            {/* Google Map – visible only on md+ */}
            <div className="mt-4 hidden md:block rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Griffon Systems Elmhurst IL"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.916651871323!2d-87.9523834!3d41.908517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4d45e6bdb44f%3A0xe6d8ec49f2e9c5d5!2s650%20W%20Grand%20Ave%20%23206%2C%20Elmhurst%2C%20IL%2060126!5e0!3m2!1sen!2sus!4v1698412844011"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* --- Column 2: Hours --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Hours</h3>
            <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
            <p>Closed Saturday & Sunday</p>
          </div>

          {/* --- Column 3: Connect --- */}
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

        {/* --- Footer Bottom Bar --- */}
        <div className="mt-8 border-t border-gray-800 pt-4 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Griffon Systems, Inc. — All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
