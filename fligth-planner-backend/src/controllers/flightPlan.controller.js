import {
  createFlightPlanService,
  listFlightPlansService
} from '../services/flightPlan.service.js';

/**
 * POST /flightplan
 * Cria um plano de voo
 */
export async function createFlightPlan(req, res) {
  try {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        message: 'origin e destination são obrigatórios'
      });
    }

    const result = await createFlightPlanService(origin, destination);

    return res.status(201).json(result);

  } catch (error) {
    console.error('ERRO CREATE FLIGHTPLAN 👉', error.message);
    return res.status(400).json({
      error: error.message
    });
  }
}

/**
 * GET /flightplan
 * Lista todos os planos de voo
 */
export async function listFlightPlans(req, res) {
  try {
    const {origin, destination,aircraft} = req.query;

    const plans = await listFlightPlansService({
      origin,
      destination,
      aircraft
    });
    return res.json(plans);

  } catch (error) {
    console.error('ERRO LIST FLIGHTPLAN 👉', error.message);
    return res.status(500).json({
      error: 'Erro ao listar planos de voo'
    });
  }
}
