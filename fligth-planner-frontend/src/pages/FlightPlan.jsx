import { useEffect, useState } from 'react';
import { createFlightPlan, listAirports } from '../services/api';

export default function FlightPlan() {
  const [airports, setAirports] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [aircraft, setAircraft] = useState('C172');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar aeroportos ao abrir a página
  useEffect(() => {
    async function loadAirports() {
      const data = await listAirports();
      setAirports(data);
    }
    loadAirports();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await createFlightPlan({
        origin,
        destination,
        aircraft
      });

      setResult(data);
    } catch (error) {
      alert('Erro ao criar plano');
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Simulador de Plano de Voo</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Origem:</label>
          <select value={origin} onChange={e => setOrigin(e.target.value)} required>
            <option value="">Selecione</option>
            {airports.map(a => (
              <option key={a.id} value={a.icao}>
                {a.icao} - {a.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Destino:</label>
          <select value={destination} onChange={e => setDestination(e.target.value)} required>
            <option value="">Selecione</option>
            {airports.map(a => (
              <option key={a.id} value={a.icao}>
                {a.icao} - {a.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Aeronave:</label>
          <select value={aircraft} onChange={e => setAircraft(e.target.value)}>
            <option value="C172">Cessna 172</option>
            <option value="PA28">Piper PA-28</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Calculando...' : 'Criar Plano'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultado</h3>
          <p><strong>Origem:</strong> {result.origin}</p>
          <p><strong>Destino:</strong> {result.destination}</p>
          <p><strong>Aeronave:</strong> {result.aircraft}</p>
          <p><strong>Distância:</strong> {result.distance_km} km</p>
          <p><strong>Tempo:</strong> {result.flight_time_hours} h</p>
          <p><strong>Combustível:</strong> {result.fuel_liters} L</p>
        </div>
      )}
    </div>
  );
}
