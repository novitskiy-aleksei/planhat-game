export const config = {
  tickInterval: 1000,
  defaultHealth: 4,
  customerMinHealth: 0,
  customerMaxHealth: 5,

  customersStartCount: 5,
  timeScale: 12960, // real seconds in one game second
  gameDuration:  600, // seconds

  customerGrowCalculationInterval: 30,
  // customerCancellationCalculationInterval: 15,
  // ...

  customerGrowMinHealth: 3.6,

  plans: {
    basic: 3000,
    standart: 10000,
    pro: 25000,
  }
};
