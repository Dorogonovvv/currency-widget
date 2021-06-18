import { convertRatesToChartData } from "./convert-rates-to-chart-data";

describe("convertRatesToChartData", () => {
  it("should convert exchange series to chart data array correctly", () => {
    const rates = { "6/18/2021": { USD: 1.13 } };
    const result = convertRatesToChartData(rates);
    expect(result).toEqual([{ date: "6/18/2021", USD: 1.13 }]);
  });
});
