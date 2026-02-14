import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3300';

function App() {
  // Estados do formulário
  const [airports, setAirports] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [aircraft, setAircraft] = useState('C172');

  // Estados de dados
  const [flightResult, setFlightResult] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ==============================
  // Carregar aeroportos
  // ==============================
  const loadAirports = async () => {
    try {
      const response = await fetch(`${API_URL}/airports`);
      const data = await response.json();
      setAirports(data);
    } catch (err) {
      setError('Erro ao carregar aeroportos');
    }
  };

  // ==============================
  // Carregar histórico
  // ==============================
  const loadPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/flightplan`);
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      setError('Erro ao carregar histórico');
    }
  };

  // ==============================
  // Criar plano de voo
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFlightResult(null);

    if (!origin || !destination) {
      setError('Selecione origem e destino');
      return;
    }

    if (origin === destination) {
      setError('Origem e destino não podem ser iguais');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/flightplan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin,
          destination,
          aircraft
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar plano');
      }

      setFlightResult(data);
      loadPlans(); // atualiza histórico
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // ==============================
  // Inicialização
  // ==============================
  useEffect(() => {
    loadAirports();
    loadPlans();
  }, []);
  

  return (
    <div className="container">
      <h1>Flight Planner</h1>

      {/* ============================== */}
      {/* Formulário */}
      {/* ============================== */}
      <form onSubmit={handleSubmit}>

        <label>Origem</label>
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="">Selecione</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.icao}>
              {airport.icao} - {airport.nome}
            </option>
          ))}
        </select>

        <label>Destino</label>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          <option value="">Selecione</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.icao}>
              {airport.icao} - {airport.nome}
            </option>
          ))}
        </select>

        <label>Aeronave</label>
        <select value={aircraft} onChange={(e) => setAircraft(e.target.value)}>
          <option value="C172">Cessna 172</option>
          <option value="PA28">Piper PA-28</option>
          <option value="BE58">Beechcraft Baron</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Calculando...' : 'Criar Plano de Voo'}
        </button>
      </form>

      {/* ============================== */}
      {/* Erro */}
      {/* ============================== */}
      {error && <p className="error">{error}</p>}

      {/* ============================== */}
      {/* Resultado */}
      {/* ============================== */}
      {flightResult && (
        <div className="result">
          <h2>Resultado do Voo</h2>
          <p><strong>Origem:</strong> {flightResult.origin}</p>
          <p><strong>Destino:</strong> {flightResult.destination}</p>
          <p><strong>Aeronave:</strong> {flightResult.aircraft}</p>
          <p><strong>Distância:</strong> {flightResult.distance_km} km</p>
          <p><strong>Tempo de voo:</strong> {flightResult.flight_time_hours} h</p>
          <p><strong>Combustível:</strong> {flightResult.fuel_liters} L</p>
        </div>
      )}

      {/* ============================== */}
      {/* Histórico */}
      {/* ============================== */}
      <div className="history">
        <h2>Histórico de Voos</h2>

        <table>
          <thead>
            <tr>
              <th>Origem</th>
              <th>Destino</th>
              <th>Aeronave</th>
              <th>Distância</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.origin}</td>
                <td>{plan.destination}</td>
                <td>{plan.aircraft}</td>
                <td>{plan.distance_km} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
