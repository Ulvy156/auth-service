//combine array into format '1,2,3'
export function combineBrIds(brIds: number[]): string {
  return Array.isArray(brIds) ? brIds.join(',') : '';
}
