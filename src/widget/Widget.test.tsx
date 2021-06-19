import React from "react";
import { render, findByText, getByText } from "@testing-library/react";
import { Widget } from "./Widget";
import * as useGetExchangeHook from "../hooks/use-get-exchange";

jest.mock("./Currencies", () => {
  return { Currencies: () => "Currencies" };
});
jest.mock("./Chart", () => {
  return { LineChart: () => "LineChart" };
});

describe("Widget", () => {
  it("should check loading state", () => {
    jest
      .spyOn(useGetExchangeHook, "useGetExchange")
      .mockReturnValue({ isLoading: true, error: undefined, data: undefined });
    const { container } = render(<Widget />);
    expect(container.firstChild).toHaveClass("spin-wrapper");
  });

  it("should check one of the possible errors - from useGetExchange", async () => {
    jest.spyOn(useGetExchangeHook, "useGetExchange").mockReturnValue({
      isLoading: false,
      error: "Any error",
      data: undefined,
    });
    const { container } = render(<Widget />);

    expect(
      await findByText(
        container,
        "Something went wrong with fetching exchange rates"
      )
    ).toBeVisible();
  });

  it("should render Currencies and Chart", async () => {
    jest.spyOn(useGetExchangeHook, "useGetExchange").mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        success: true,
        timestamp: 1624054330,
        base: "EUR",
        date: new Date(),
        rates: { EUR: 1.23 },
      },
    });

    const { container } = render(<Widget />);
    expect(getByText(container, "Currencies")).toBeTruthy();
    expect(getByText(container, "LineChart")).toBeTruthy();
  });
});
