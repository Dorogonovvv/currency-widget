import { ExchangeSeriesResponse } from "../interfaces";
import { CHART_TICKS_AMOUNT } from "../constants";

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const generateRatesTimeSeries = (
  currency = "",
  amountOfDaysFromToday = CHART_TICKS_AMOUNT
) => {
  return [...Array(amountOfDaysFromToday)].reduce((accum, _, index) => {
    let date = new Date();
    date.setDate(date.getDate() - index);
    return {
      [new Date(date).toLocaleDateString()]: {
        [currency]: +getRandomArbitrary(0, 3.5).toFixed(5),
      },
      ...accum,
    };
  }, {});
};

export const simulateExchangeSeries = (
  base: string
): ExchangeSeriesResponse => ({
  success: true,
  timeseries: true,
  base,
  // hardcoded dates as they're not used just to keep interfaces consistent
  start_date: "2021-17-01",
  end_date: "2012-18-01",
  rates: generateRatesTimeSeries(base, CHART_TICKS_AMOUNT),
});
