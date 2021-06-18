import { ChartDataItem, ExchangeSeriesRates } from "../interfaces";

export const convertRatesToChartData = (
  rates: ExchangeSeriesRates
): Array<ChartDataItem> => {
  return Object.entries(rates).map(([date, currencyObject]) => ({
    ...currencyObject,
    date,
  }));
};
