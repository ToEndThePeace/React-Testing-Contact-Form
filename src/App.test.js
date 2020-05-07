import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("App is rendered to the document", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

test("All expected form inputs are present", () => {
  const { getByLabelText: get, getByTestId: getId } = render(<App />);
  expect(get(/first name/i)).toBeInTheDocument();
  expect(get(/last name/i)).toBeInTheDocument();
  expect(get(/email/i)).toBeInTheDocument();
  expect(get(/message/i)).toBeInTheDocument();
  expect(getId(/submit/i)).toBeInTheDocument();
});

test("Form can be successfully filled out and submitted", async () => {
  const { getByLabelText: get, getByTestId: getId, getByText: getTx } = render(
    <App />
  );
  fireEvent.change(get(/first name/i), { target: { value: "Bra" } });
  fireEvent.change(get(/last name/i), { target: { value: "Ramirez" } });
  fireEvent.change(get(/email/i), { target: { value: "br@nd.on" } });
  fireEvent.change(get(/message/i), { target: { value: "message text" } });
  fireEvent.click(getId("submit"));

  setTimeout(() => {
    expect(getTx(/ramirez/i)).toBeInTheDocument();
  });
});
