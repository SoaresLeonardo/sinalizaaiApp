export function CheckGeoInfos(x: number | null, y: number | null) {
  if (typeof x === 'number' && typeof y === 'number') {
    return false; // Se ambos são números, retorna true
  }

  return true; // Caso contrário, retorna false
}
