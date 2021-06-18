export interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: Date;
  rates: Record<string, number>;
  error?: {
    code: string;
    message: string;
  };
}

export type ExchangeSeriesRates = Record<string, Record<string, number>>;

export interface ExchangeSeriesResponse {
  success: boolean;
  base: string;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  rates: ExchangeSeriesRates;
  error?: {
    code: string;
    message: string;
  };
}

export interface ChartDataItem {
  date: string;
  [key: string]: string;
}
