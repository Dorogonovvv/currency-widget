import React from "react";
import { Card, Typography, Space, Spin, Alert } from "antd";
import { Line } from "@ant-design/charts";
import { LineConfig } from "@ant-design/charts/es/line";

import { ExchangeRateResponse, ExchangeSeriesResponse } from "../interfaces";
import { CHART_TICKS_AMOUNT, DATE_FORMAT_OPTIONS } from "../constants";
import { useGetExchange } from "../hooks/use-get-exchange";
import { simulateExchangeSeries } from "../helpers/simulate-exchange-series";
import { convertRatesToChartData } from "../helpers/convert-rates-to-chart-data";

type LineChartProps = Pick<ExchangeRateResponse, "base" | "timestamp">;

export const LineChart = ({ base, timestamp }: LineChartProps) => {
  // omitted passing real dates because of 403 response for free subscription
  const queryString = `&base=${base}&start_date=2020-05-01&end_date=2020-05-05`;
  const { isLoading, error, data } = useGetExchange<ExchangeSeriesResponse>(
    "timeseries",
    base,
    queryString
  );

  if (isLoading)
    return (
      <div className="spin-wrapper">
        <Spin />
      </div>
    );

  if (error) {
    return (
      <Alert
        message={`Error while loading chart data for ${base} currency`}
        type="error"
      />
    );
  }

  let chartConfig: LineConfig = {
    data: data?.rates
      ? convertRatesToChartData(data.rates)
      : convertRatesToChartData(simulateExchangeSeries(base).rates),
    padding: "auto",
    xField: "date",
    yField: base,
    xAxis: { tickCount: CHART_TICKS_AMOUNT },
  };

  const { min, max } = chartConfig.data.reduce((accum, dataItem, i) => {
    if (!accum.min) {
      return {
        min: dataItem,
        max: dataItem,
      };
    }
    return {
      min: dataItem[base] < accum.min[base] ? dataItem : accum.min,
      max: dataItem[base] > accum.max[base] ? dataItem : accum.max,
    };
  }, {});

  const LIST = [
    { title: "Active currency:", description: base },
    {
      title: "Last updated:",
      description: new Intl.DateTimeFormat("en", DATE_FORMAT_OPTIONS).format(
        new Date(timestamp * 1000)
      ),
    },
    { title: `Min on ${min["date"]}:`, description: min[base] },
    { title: `Max on ${max["date"]}:`, description: max[base] },
  ];

  return (
    <>
      {LIST.map(({ title, description }) => (
        <div key={title}>
          <Space>
            <Typography.Text type="secondary">{title}</Typography.Text>
            <Typography.Text strong>{description}</Typography.Text>
          </Space>
        </div>
      ))}
      <Card>
        <Line {...chartConfig} />
      </Card>
    </>
  );
};
