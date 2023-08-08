export function CheckGeoInfos(x: number | null, y: number | null) {
  if (typeof x === 'string' && typeof y === 'string') {
    return false; // Se ambos são números, retorna true
  }

  return true; // Caso contrário, retorna false
}
