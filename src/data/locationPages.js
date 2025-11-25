// src/data/locationPages.js

export const LOCATION_PAGES = {
  "oak-brook": {
    city: "Oak Brook",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Oak Brook, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Oak Brook, IL",
      }
    }
  },

  "naperville": {
    city: "Naperville",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Naperville, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Naperville, IL",
      }
    }
  },

  "elmhurst": {
    city: "Elmhurst",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Elmhurst, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Elmhurst, IL",
      }
    }
  },

  "chicago": {
    city: "Chicago",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Chicago, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Chicago, IL",
      }
    }
  },

  "downers-grove": {
    city: "Downers Grove",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Downers Grove, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Downers Grove, IL",
      }
    }
  },

  "hinsdale": {
    city: "Hinsdale",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Hinsdale, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Hinsdale, IL",
      }
    }
  },

  "wheaton": {
    city: "Wheaton",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Wheaton, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Wheaton, IL",
      }
    }
  },

  "lisle": {
    city: "Lisle",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Lisle, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Lisle, IL",
      }
    }
  },

  "schaumburg": {
    city: "Schaumburg",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Schaumburg, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Schaumburg, IL",
      }
    }
  },

  "arlington-heights": {
    city: "Arlington Heights",
    services: {
      "security-integrator": {
        title: "Security Camera & Access Control Integrator in Arlington Heights, IL",
      },
      "access-control-integrator": {
        title: "Access Control Integrator in Arlington Heights, IL",
      }
    }
  },

  // --- ADDING 15 MORE CHICAGOLAND SUBURBS ---
  "addison": { city: "Addison", services: sameServices("Addison") },
  "aurora": { city: "Aurora", services: sameServices("Aurora") },
  "batavia": { city: "Batavia", services: sameServices("Batavia") },
  "bolingbrook": { city: "Bolingbrook", services: sameServices("Bolingbrook") },
  "burr-ridge": { city: "Burr Ridge", services: sameServices("Burr Ridge") },
  "carol-stream": { city: "Carol Stream", services: sameServices("Carol Stream") },
  "clarendon-hills": { city: "Clarendon Hills", services: sameServices("Clarendon Hills") },
  "glen-ellyn": { city: "Glen Ellyn", services: sameServices("Glen Ellyn") },
  "geneva": { city: "Geneva", services: sameServices("Geneva") },
  "itaska": { city: "Itaska", services: sameServices("Itaska") },
  "lombard": { city: "Lombard", services: sameServices("Lombard") },
  "melrose-park": { city: "Melrose Park", services: sameServices("Melrose Park") },
  "oak-park": { city: "Oak Park", services: sameServices("Oak Park") },
  "rosemont": { city: "Rosemont", services: sameServices("Rosemont") },
  "west-chicago": { city: "West Chicago", services: sameServices("West Chicago") },
}

// Helper to reduce repetition
function sameServices(cityName) {
  return {
    "security-integrator": {
      title: `Security Camera & Access Control Integrator in ${cityName}, IL`,
    },
    "access-control-integrator": {
      title: `Access Control Integrator in ${cityName}, IL`,
    }
  }
}
