export function CheckGeoInfos(x: string | null, y: string | null) {
  if (typeof x === 'string' && typeof y === 'string') {
    return false; // Se ambos são números, retorna true
  }

  return true; // Caso contrário, retorna false
}
