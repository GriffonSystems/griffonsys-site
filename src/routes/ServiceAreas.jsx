import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

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
  "Rogers Park",
]

const slugify = (c) => c.toLowerCase().replace(/ /g, "-")

export default function ServiceAreas() {
  return (
    <main className="container py-16">
      <Helmet>
        <title>Chicagoland Service Areas | Griffon Systems</title>
        <meta
          name="description"
          content="Griffon Systems provides professional security camera, access control, and security system supplier services across all of Chicagoland."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-8">Chicagoland Service Areas</h1>

      <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-lg">
        {cities.sort().map((city) => (
          <li key={city}>
            <Link
              to={`/locations/${slugify(city)}/security-system-supplier`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {city}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
