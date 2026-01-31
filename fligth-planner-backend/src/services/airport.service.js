import pool from '../config/database.js';

/**
 * Busca aeroporto pelo código ICAO
 */
export async function getAirportByIcaoService(icao) {
  if (!icao || typeof icao !== 'string') {
    throw new Error('Código ICAO inválido');
  }

  const icaoNormalized = icao.trim().toUpperCase();

  const [rows] = await pool.query(
    `
    SELECT
      id,
      icao,
      name,
      city,
      country,
      latitude,
      longitude,
      elevation_ft
    FROM airports
    WHERE icao = ?
    LIMIT 1
    `,
    [icaoNormalized]
  );

  if (rows.length === 0) {
    return null;
  }

  const airport = rows[0];

  // 🔒 Garantia de tipo (CRÍTICO para Haversine)
  return {
    id: airport.id,
    icao: airport.icao,
    name: airport.name,
    city: airport.city,
    country: airport.country,
    latitude: Number(airport.latitude),
    longitude: Number(airport.longitude),
    elevation_ft: airport.elevation_ft
  };
}
