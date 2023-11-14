import { it } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import EquipmentTable from "./AdminEquipment";
import StudentBorrowRequest from "./StudentBorrowRequest";
import { useContext } from "react";
import { expect } from "chai";
import StudentDashBoard from "./StudentDashBoard";
import StudentEquipment from "./StudentEquipment";
import RequestTable from "./RequestTable";

it("admin equipment test", () => {
  const mockData = [
    {
      _id: 1,
      name: "Equipment 1",
      lab: "Lab 1",
      description: "Description 1",
      quantity: 1,
    },
  ];

  render(<EquipmentTable title={mockData} />);
  const tableElement = screen.getByRole("table");
  console.log(tableElement);
  expect(tableElement.querySelectorAll("tr").length).toBe(2);
});

it("student borrow request test", () => {
  const mockData = [
    {
      id: 1,
      equipmentName: "Laptop",
      quantity: 2,
      requestDate: "2023-10-28",
      approveDate: "--/--",
      lastReturnDate: "--/--",
      status: "Waiting",
    },
    {
      id: 2,
      equipmentName: "Calculator",
      quantity: 1,
      requestDate: "2023-10-26",
      approveDate: "2023-10-27",
      lastReturnDate: "2023-11-25",
      status: "Approved",
    },
  ];

  render(<StudentBorrowRequest title={mockData} />);
  const tableElement = screen.getByRole("table");
  console.log(tableElement);
  expect(tableElement.querySelectorAll("tr").length).toBe(3);
});

it("student dashboard test", () => {
  const mockData = [
    {
      id: 2,
      equipmentName: "Calculator",
      quantity: 1,
      lastReturnDate: "2023-10-27",
    },
  ];

  const table = render(<StudentDashBoard title={mockData} />);
  const x = screen.getAllByRole("row");
  expect(x.length).toBe(4);
});

it("student equipment test", () => {
  const mockData = [
    {
      id: 2,
      equipmentName: "Calculator",
      type: "machine",
      quantity: 1,
    },
  ];

  const table = render(<StudentEquipment title={mockData} />);
  const x = screen.getAllByRole("row");
  expect(x.length).toBe(2);
});
