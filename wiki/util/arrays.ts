export function range(start: number = 0, end: number, step: number = 1) {
  let result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result;
}