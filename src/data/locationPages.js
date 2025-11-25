// src/data/locationPages.js

function sameServices(cityName) {
  return {
    "security-integrator": {
      title: `Security Camera & Access Control Integrator in ${cityName}, IL`,
    },
    "access-control-integrator": {
      title: `Access Control Integrator in ${cityName}, IL`,
    },
    "security-system-supplier": {
      title: `Security System Supplier in ${cityName}, IL`,
    },
  }
}

const CITY_LIST = [
  // (same full list as ServiceAreas.jsx)
  "Chicago", "Arlington Heights", "Aurora", "Addison", "Algonquin", "Antioch",
  // … all suburbs …
  "Rogers Park"
]

export const LOCATION_PAGES = {}

CITY_LIST.forEach((cityName) => {
  const slug = cityName.toLowerCase().replace(/ /g, "-")
  LOCATION_PAGES[slug] = {
    city: cityName,
    services: sameServices(cityName),
  }
})
