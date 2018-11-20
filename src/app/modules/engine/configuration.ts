export const config = {
  tickInterval: 1000,
  defaultHealth: 4,
  customerMinHealth: 0,
  customerMaxHealth: 5,
  reduceHpPerTick: 0.001,

  customersStartCount: 5,
  customersMaxCount: 30,
  timeScale: 129600, // real seconds in one game second
  gameDuration:  600, // seconds

  customerGrowCalculationInterval: 20,
  customerCancellationCalculationInterval: 20,
  customerUpgradePlanCalculationInterval: 30,
  customerRequestFeatureCalculationInterval: 30,
  customerBugReportCalculationInterval: 20,
  customerSupportTicketCalculationInterval: 15,

  bugFixDuration: 5,
  buildFeatureDuration: 12,

  customerGrowMinHealth: 3.6,

  affections: {
    positive: {
      feature: 3.5,
      meeting: 2,
      ticket: 0.5,
      bug: 1.5,
      cancellationWin: 1.5
    },
    negative: {
      feature: 0.2,
      bug: 1,
      ticket: 0.5,
    }
  },

  plans: {
    basic: 3000,
    standart: 10000,
    pro: 25000,
  }
};
