import { render, fireEvent, getByText } from "@testing-library/react";
import { Currencies, CurrenciesProps } from "./Currencies";

const CURRENCIES_PROPS: CurrenciesProps = {
  rates: { USD: 1, EUR: 1.234 },
  onSelect: jest.fn(),
};

describe("Currencies", () => {
  it("should render button for each rate", () => {
    const { container } = render(<Currencies {...CURRENCIES_PROPS} />);
    expect(container.querySelectorAll("button")).toHaveLength(2);
  });

  it("should render all currency names and values", () => {
    const { getByText } = render(<Currencies {...CURRENCIES_PROPS} />);
    Object.entries(CURRENCIES_PROPS.rates).forEach(([currency, value]) => {
      expect(getByText(currency)).toBeTruthy();
      expect(getByText(value)).toBeTruthy();
    });
  });

  it("button should call callback with currency name on click", () => {
    const firstRatesCurrency = Object.keys(CURRENCIES_PROPS.rates)[0];
    const { container } = render(<Currencies {...CURRENCIES_PROPS} />);
    fireEvent.click(getByText(container, firstRatesCurrency));
    expect(CURRENCIES_PROPS.onSelect).toHaveBeenCalledWith(firstRatesCurrency);
  });
});
