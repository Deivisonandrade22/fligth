/**
 * Converte graus para radianos
 */
function toRad(value) {
  return (value * Math.PI) / 180;
}

/**
 * Calcula distância entre dois pontos usando a fórmula de Haversine
 * Retorna distância em KM
 */
export function haversine(lat1, lon1, lat2, lon2) {
  if (
    lat1 == null || lon1 == null ||
    lat2 == null || lon2 == null
  ) {
    throw new Error('Coordenadas inválidas para cálculo de distância');
  }

  const R = 6371; // Raio médio da Terra em KM

  const φ1 = toRad(Number(lat1));
  const φ2 = toRad(Number(lat2));
  const Δφ = toRad(Number(lat2) - Number(lat1));
  const Δλ = toRad(Number(lon2) - Number(lon1));

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
