export default function FlightForm() {
  return (
    <form>
      <div>
        <label>Origem (ICAO)</label>
        <input type="text" />
      </div>

      <div>
        <label>Destino (ICAO)</label>
        <input type="text" />
      </div>

      <div>
        <label>Aeronave</label>
        <input type="text" />
      </div>

      <button type="submit">Calcular</button>
    </form>
  );
}
