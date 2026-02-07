import pool from '../config/database.js';

/**
 * Lista todos os aeroportos
 */
export async function listAirportsService() {
  const [rows] = await pool.query(
    'SELECT * FROM airports ORDER BY icao'
  );

  return rows;
}

/**
 * Busca aeroporto por ICAO
 */
export async function getAirportByIcaoService(icao) {
  const [rows] = await pool.query(
    'SELECT * FROM airports WHERE TRIM(UPPER(icao)) = TRIM(UPPER(?))',
    [icao]
  );

  return rows[0];
}
