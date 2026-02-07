import express from 'express';
import cors from 'cors';
import airportRoutes from './routes/airports.routes.js';
import flightPlanRoutes from './routes/flightPlan.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/airports', airportRoutes);
app.use('/flightplan', flightPlanRoutes);

export default app;
