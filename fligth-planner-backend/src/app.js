import express from 'express';
import airportRoutes from './routes/airports.routes.js';
import flightPlanRoutes from './routes/flightPlan.routes.js';

const app = express();

app.use(express.json());

app.use('/airports', airportRoutes);
app.use('/flightplan', flightPlanRoutes);

export default app;
