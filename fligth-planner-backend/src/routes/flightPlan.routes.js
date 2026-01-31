import { Router } from 'express';
import {
  createFlightPlan,
  listFlightPlans
} from '../controllers/flightPlan.controller.js';

const router = Router();

/**
 * GET /flightplan
 * Lista todos os planos de voo
 */
router.get('/', listFlightPlans);

/**
 * POST /flightplan
 * Cria um novo plano de voo
 */
router.post('/', createFlightPlan);

export default router;
