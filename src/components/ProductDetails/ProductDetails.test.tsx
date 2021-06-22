import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductDetails from "./ProductDetails";

describe("<ProductDetails />", () => {
  const props = {
    product: {},
    categories: [],
    show: false,
    onSave: () => {},
    onHide: () => {},
  };
  test("it should not mount by default", () => {
    render(<ProductDetails {...props} />);

    const productDetails = screen.queryByTestId("ProductDetails");

    expect(productDetails).toBeNull();
  });

  test("it should display modal when show param is true", () => {
    const updatedProps = Object.assign({}, { ...props }, { show: true });
    render(<ProductDetails {...updatedProps} />);

    const productDetails = screen.getByTestId("ProductDetails");

    expect(productDetails).toBeInTheDocument();
  });
});
