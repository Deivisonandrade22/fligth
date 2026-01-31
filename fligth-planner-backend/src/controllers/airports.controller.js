import { 
  listAirportsService, 
  getAirportByIcaoService 
} from '../services/airport.service.js';

/* LISTAR TODOS OS AEROPORTOS */
export const listAirports = async (req, res) => {
  try {
    const airports = await listAirportsService();
    return res.json(airports);
  } catch (error) {
    console.error('ERRO LIST 👉', error);
    return res.status(500).json({
      message: 'Erro ao buscar aeroportos'
    });
  }
};

/* BUSCAR AEROPORTO POR ICAO */
export const getAirportByIcao = async (req, res) => {
  try {
    const icao = req.params.icao.toUpperCase();

    const airport = await getAirportByIcaoService(icao);

    if (!airport) {
      return res.status(404).json({
        message: 'Aeroporto não encontrado'
      });
    }

    return res.json(airport);
  } catch (error) {
    console.error('ERRO ICAO 👉', error);
    return res.status(500).json({
      message: 'Erro ao buscar aeroporto'
    });
  }
};
