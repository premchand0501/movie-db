export const factorial = (limit: number): number => (limit == 0) ? 1 : limit * factorial(limit - 1);

export const fibonacci = (limit: number): string => {
  let str: string = '';
  if (limit == 0) {
    return str = limit.toString();
  }
  let prev: number = 0;
  let next: number = 0;
  for (let i = 1; i < limit; i++) {
    next = i + prev;
    str += prev + ' ' + next + ' ';
    prev += next;
  }
  return str;
}