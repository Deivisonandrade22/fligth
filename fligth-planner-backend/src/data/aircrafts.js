export const aircrafts = {
  C172: {
    code: 'C172',
    name: 'Cessna 172 Skyhawk',
    category: 'GA',
    engine: 'Piston',
    fuelType: 'AVGAS',

    performance: {
      cruiseSpeedKts: 122,     // knots
      maxRangeNm: 640,         // nautical miles
      serviceCeilingFt: 13000
    },

    fuel: {
      consumptionGph: 8.5,     // gallons per hour
      tankCapacityGal: 56
    }
  },

  A320: {
    code: 'A320',
    name: 'Airbus A320',
    category: 'Jet',
    engine: 'Turbofan',
    fuelType: 'JET-A1',

    performance: {
      cruiseSpeedKts: 450,
      maxRangeNm: 3300,
      serviceCeilingFt: 39000
    },

    fuel: {
      consumptionKgPerHour: 2500
    }
  }
};
