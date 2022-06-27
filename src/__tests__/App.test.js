import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should render welcome message', () => {
  render(<App />);
  const h1Element = screen.getByText(/hello react app/i);
  expect(h1Element).toBeInTheDocument();
});

