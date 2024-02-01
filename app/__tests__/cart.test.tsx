import { expect, test, mount } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "../cart/page";

test("Cart Rendered", () => {
  render(<Cart />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Shopping Cart" })
  ).toBeDefined();
});

test("button was clicked"),
  async () => {
    render(<Cart />); // render the Cart component
    const wrapper = mount(Cart, {}); // mount the component
    const button = wrapper.find("#button"); // find the button inside the Cart component
    button.simulate("click"); // simulate a click event
    // verify that the button was clicked
    expect(button.props().clicked).toBe(true);
  };
