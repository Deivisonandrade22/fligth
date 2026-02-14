import pool from '../config/database.js';
import { haversine } from '../utils/haversine.js';
import { getAirportByIcaoService } from './airport.service.js';
import { aircrafts } from '../data/aircrafts.js';

/**
 * Cria um plano de voo realista
 */
export async function createFlightPlanService(
  originIcao,
  destinationIcao,
  aircraftCode = 'C172'
) {
  // 🔹 Aeroportos
  const origin = await getAirportByIcaoService(originIcao);
  const destination = await getAirportByIcaoService(destinationIcao);

  if (!origin || !destination) {
    throw new Error('Aeroporto de origem ou destino não encontrado');
  }

  // 🔹 Aeronave
  const aircraft = aircrafts[aircraftCode.toUpperCase()];
  if (!aircraft) {
    throw new Error('Aeronave não encontrada');
  }

  // 🔹 Distância (km)
  const distanceKm = haversine(
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude
  );

  // 🔹 Velocidade (knots → km/h)
  const cruiseSpeedKmh =
    aircraft.performance.cruiseSpeedKts * 1.852;

  // 🔹 Tempo de voo (horas)
  const flightTimeHours = distanceKm / cruiseSpeedKmh;

  // 🔹 Consumo (GA – pistão)
  let fuelUsedLiters = null;

  if (aircraft.engine === 'Piston') {
    const fuelUsedGallons =
      aircraft.fuel.consumptionGph * flightTimeHours;

    fuelUsedLiters = fuelUsedGallons * 3.785;

    // 🔹 Autonomia
    const maxFlightHours =
      aircraft.fuel.tankCapacityGal /
      aircraft.fuel.consumptionGph;

    if (flightTimeHours > maxFlightHours) {
      throw new Error('Autonomia insuficiente para esse voo');
    }
  }

  // 🔹 Salva no banco
  const [result] = await pool.query(
    `
    INSERT INTO flight_plans
      (
        origin,
        destination,
        aircraft,
        distance_km,
        flight_time_hours,
        fuel_liters
      )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      origin.icao,
      destination.icao,
      aircraft.name,
      Number(distanceKm.toFixed(2)),
      Number(flightTimeHours.toFixed(2)),
      fuelUsedLiters !== null
        ? Number(fuelUsedLiters.toFixed(2))
        : null
    ]
  );

  // 🔹 Retorno
  return {
    id: result.insertId,
    origin: origin.icao,
    destination: destination.icao,
    aircraft: aircraft.name,
    distance_km: Number(distanceKm.toFixed(2)),
    flight_time_hours: Number(flightTimeHours.toFixed(2)),
    fuel_liters:
      fuelUsedLiters !== null
        ? Number(fuelUsedLiters.toFixed(2))
        : null
  };
}

/**
 * Lista planos de voo com filtros
 */
export async function listFlightPlansService(filters = {}) {
  let sql = `
    SELECT
      id,
      origin,
      destination,
      aircraft,
      distance_km,
      flight_time_hours,
      fuel_liters,
      created_at
    FROM flight_plans
    WHERE 1 = 1
  `;

  const params = [];

  if (filters.origin?.trim()) {
    sql += ' AND origin = ?';
    params.push(filters.origin.trim().toUpperCase());
  }

  if (filters.destination?.trim()) {
    sql += ' AND destination = ?';
    params.push(filters.destination.trim().toUpperCase());
  }

  if (filters.aircraft?.trim()) {
    sql += ' AND aircraft LIKE ?';
    params.push(`%${filters.aircraft.trim()}%`);
  }

  sql += ' ORDER BY created_at DESC LIMIT 3';

  const [rows] = await pool.query(sql, params);
  return rows;
}
