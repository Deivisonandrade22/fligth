import pool from '../config/database.js';
import { getAirportExternal } from './externalAviation.service.js';

/**
 * Lista todos os aeroportos do banco
 */
export async function listAirportsService() {
  const [rows] = await pool.query(`
    SELECT 
      id,
      icao,
      iata,
      nome,
      cidade,
      estado,
      pais,
      latitude,
      longitude
    FROM airports
    ORDER BY icao
  `);

  return rows;
}

/**
 * Busca aeroporto por ICAO
 * 1 - Procura no banco
 * 2 - Se não encontrar, busca na AviationStack
 * 3 - Salva no banco
 */
export async function getAirportByIcaoService(icao) {
  const code = icao.toUpperCase();

  // 1️⃣ Buscar no banco
  const [rows] = await pool.query(
    `SELECT * FROM airports WHERE icao = ?`,
    [code]
  );

  if (rows.length > 0) {
    return rows[0];
  }

  // 2️⃣ Buscar na API externa
  const externalAirport = await getAirportExternal(code);

  if (!externalAirport) {
    return null;
  }

  // 3️⃣ Salvar no banco
  const [result] = await pool.query(
    `
    INSERT INTO airports
    (icao, nome, cidade, pais, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      externalAirport.icao,
      externalAirport.nome,
      externalAirport.cidade,
      externalAirport.pais,
      externalAirport.latitude,
      externalAirport.longitude
    ]
  );

  return {
    id: result.insertId,
    ...externalAirport
  };
}
