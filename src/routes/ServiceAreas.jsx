import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

// --- Full Chicagoland Coverage (~150 cities + Chicago neighborhoods) ---
const cities = [
  "Chicago", "Arlington Heights", "Aurora", "Addison", "Algonquin", "Antioch",
  "Barrington", "Bartlett", "Batavia", "Bensenville", "Bloomingdale",
  "Bolingbrook", "Bridgeview", "Buffalo Grove", "Burr Ridge", "Carol Stream",
  "Carpentersville", "Cary", "Channahon", "Chicago Ridge", "Cicero",
  "Clarendon Hills", "Crystal Lake", "Darien", "Des Plaines", "Downers Grove",
  "East Dundee", "Elgin", "Elk Grove Village", "Elmhurst", "Elmwood Park",
  "Evanston", "Evergreen Park", "Fox Lake", "Fox River Grove", "Frankfort",
  "Geneva", "Glen Ellyn", "Glencoe", "Glendale Heights", "Glenview", "Golf",
  "Grayslake", "Gurnee", "Hainesville", "Hanover Park", "Harwood Heights",
  "Hawthorn Woods", "Highland Park", "Highwood", "Hinsdale",
  "Hoffman Estates", "Huntley", "Inverness", "Itasca", "Joliet", "Kildeer",
  "La Grange", "La Grange Park", "Lake Bluff", "Lake Forest",
  "Lake in the Hills", "Lake Villa", "Lake Zurich", "Lemont", "Libertyville",
  "Lincolnshire", "Lincolnwood", "Lisle", "Lombard", "Long Grove", "McHenry",
  "Medinah", "Melrose Park", "Mokena", "Mundelein", "Mount Prospect",
  "Naperville", "New Lenox", "Niles", "North Aurora", "North Barrington",
  "North Chicago", "Northbrook", "Northfield", "Northlake", "Oak Brook",
  "Oak Lawn", "Oak Park", "Orland Park", "Oswego", "Palatine",
  "Palos Heights", "Palos Hills", "Palos Park", "Park Ridge", "Plainfield",
  "Prospect Heights", "River Forest", "River Grove", "Riverwoods",
  "Riverside", "Rolling Meadows", "Romeoville", "Roselle", "Rosemont",
  "Round Lake", "St. Charles", "Schaumburg", "Schiller Park", "Skokie",
  "South Barrington", "South Elgin", "South Holland", "Streamwood",
  "Sugar Grove", "Tinley Park", "Vernon Hills", "Villa Park", "Warrenville",
  "Wauconda", "Waukegan", "West Chicago", "West Dundee", "Westchester",
  "Western Springs", "Wheaton", "Wheeling", "Willow Springs", "Willowbrook",
  "Wilmette", "Winfield", "Winnetka", "Wood Dale", "Woodridge", "Yorkville",

  // Chicago Neighborhoods
  "Lincoln Park", "Lakeview", "Wicker Park", "Bucktown", "Logan Square",
  "River North", "Gold Coast", "South Loop", "West Loop", "Hyde Park",
  "Bridgeport", "Chinatown", "Pilsen", "Albany Park", "Edison Park",
  "Jefferson Park", "Irving Park", "Portage Park", "Avondale", "Edgewater",
  "Rogers Park"
]

// Helper: turn city name into URL slug
function slugify(city) {
  return city.toLowerCase().replace(/ /g, "-")
}

export default function ServiceAreas() {
  return (
    <main className="container py-16">
      {/* ⭐ SEO */}
      <Helmet>
        <title>Chicagoland Service Areas | Griffon Systems</title>
        <meta
          name="description"
          content="Griffon Systems provides enterprise video surveillance, access control, wireless backhaul, and security integration services across the entire Chicagoland region."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">
        Chicagoland Service Areas
      </h1>

      <p className="text-lg text-gray-700 max-w-3xl mb-12 leading-relaxed">
        Griffon Systems proudly serves all cities, villages, and neighborhoods within
        the greater Chicagoland area. Our team delivers enterprise-grade
        video surveillance, access control, wireless backhaul and fully managed
        security integration for commercial, municipal, educational, and industrial facilities.
      </p>

      {/* City grid */}
      <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-lg">
        {cities.sort().map((city) => {
          const slug = slugify(city)
          return (
            <li key={slug}>
              <Link
                to={`/locations/${slug}/security-integrator`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {city}
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
