import { Button, Col, Row, Space, Typography } from "antd";
import React from "react";

export interface CurrenciesProps {
  rates: Record<string, number>;
  onSelect: (currency: string) => void;
}

export const Currencies = React.memo(
  ({ rates = {}, onSelect }: CurrenciesProps) => {
    return (
      <Row gutter={[10, 10]}>
        {Object.entries(rates).map(([currency, value]) => (
          <Col key={currency} span={8}>
            <Button onClick={() => onSelect(currency)}>
              <Space>
                <Typography.Text strong>{currency}</Typography.Text>
                <span>{value}</span>
              </Space>
            </Button>
          </Col>
        ))}
      </Row>
    );
  }
);
