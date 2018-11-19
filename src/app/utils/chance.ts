export function withChance(percent: number) {
  return Math.random() < percent / 100;
}
