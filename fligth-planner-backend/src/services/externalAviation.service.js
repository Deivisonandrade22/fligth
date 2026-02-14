export async function getAirportExternal(icao) {
  const apiKey = process.env.AVIATIONSTACK_KEY;

  const url = `http://api.aviationstack.com/v1/airports?access_key=${apiKey}&icao_code=${icao}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    return null;
  }

  const airport = data.data[0];

  return {
    icao: airport.icao_code,
    nome: airport.airport_name,
    cidade: airport.city,
    pais: airport.country_name,
    latitude: airport.latitude,
    longitude: airport.longitude
  };
}
