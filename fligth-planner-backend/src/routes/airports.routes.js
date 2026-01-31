import { Router } from 'express';
import {
  listAirports,
  getAirportByIcao
} from '../controllers/airports.controller.js';

const router = Router();

router.get('/', listAirports);
router.get('/:icao', getAirportByIcao);

export default router;

