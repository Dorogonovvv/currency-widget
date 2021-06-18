import React, { useState, useEffect } from "react";
import { Row, Col, Layout, Spin, Alert } from "antd";

import "./Widget.css";
import { Currencies } from "./Currencies";
import { LineChart } from "./Chart";
import { useGetExchange } from "../hooks/use-get-exchange";
import { ExchangeRateResponse } from "../interfaces";

export function Widget() {
  const { isLoading, error, data } = useGetExchange<ExchangeRateResponse>(
    "latest",
    "latest"
  );
  const [activeCurrency, setActiveCurrency] = useState<string>("");

  useEffect(() => {
    setActiveCurrency(data?.base as string);
  }, [data]);

  if (isLoading)
    return (
      <div className="spin-wrapper">
        <Spin />
      </div>
    );

  if (error || !data || data?.error?.message)
    return (
      <Alert
        message={
          data?.error?.message ||
          "Something went wrong with fetching exchange rates"
        }
        type="error"
      />
    );

  const { timestamp, rates } = data;
  return (
    <Layout>
      <Layout.Content className="widget">
        <Row gutter={[20, 20]}>
          <Col span={8} className="currency-list">
            <Currencies rates={rates} onSelect={setActiveCurrency} />
          </Col>
          <Col span={16}>
            <LineChart base={activeCurrency} timestamp={timestamp} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
