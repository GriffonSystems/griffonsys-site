// src/data/locationPages.js
// FULL CHICAGOLAND COVERAGE — auto-generated from full city list

function sameServices(cityName) {
  return {
    "security-integrator": {
      title: `Security Camera & Access Control Integrator in ${cityName}, IL`,
    },
    "access-control-integrator": {
      title: `Access Control Integrator in ${cityName}, IL`,
    },
  }
}

// ---- MASTER CITY LIST (must match ServiceAreas.jsx exactly) ----
const CITY_LIST = [
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

// ---- Convert names → slugs and generate service sets ----
export const LOCATION_PAGES = {}

CITY_LIST.forEach((cityName) => {
  const slug = cityName.toLowerCase().replace(/ /g, "-")
  LOCATION_PAGES[slug] = {
    city: cityName,
    services: sameServices(cityName)
  }
})
