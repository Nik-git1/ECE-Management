import React from "react";

const StudentDashBoard = (props) => {
  var tableData = [
    {
      id: 1,
      equipmentName: "Laptop",
      quantity: 2,
      lastReturnDate: "2023-10-25",
    },
    {
      id: 2,
      equipmentName: "Calculator",
      quantity: 1,
      lastReturnDate: "2023-10-27",
    },
  ];
  if (props.title != null) {
    tableData = props.title;
  }
  const columnNames = [
    "S.No",
    "Equipment Name",
    "Quantity",
    "Last date of Return",
    "Action",
  ];
  const returnedHeader = [
    "S.No",
    "Equipment Name",
    "Quantity",
    "Last date of Return",
    "Status",
  ];

  const renderEquipedRow = (data, index) => {
    return (
      <tr className="text-center" key={index}>
        <td className="border p-2">{index + 1}</td>
        <td className="border p-2">{data.equipmentName}</td>
        <td className="border p-2">{data.quantity}</td>
        <td className="border p-2">{data.lastReturnDate}</td>
        <td className="border p-2">
          <div className="flex items-center justify-center">
            <button className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center mr-1">
              Return
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const renderReturnedRow = (data, index) => {
    return (
      <tr className="text-center" key={index}>
        <td className="border p-2">{index + 1}</td>
        <td className="border p-2">{data.equipmentName}</td>
        <td className="border p-2">{data.quantity}</td>
        <td className="border p-2">{data.lastReturnDate}</td>
        <td className="border p-2">Waiting for Approval</td>
      </tr>
    );
  };

  const renderEquipedHeader = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        {columnNames.map((columnName, index) => (
          <th className="border p-2 text-center" key={index}>
            {columnName}
          </th>
        ))}
      </tr>
    );
  };

  const renderReturnedHeader = () => {
    return (
      <tr className="bg-[#3dafaa] text-white">
        {returnedHeader.map((columnName, index) => (
          <th className="border p-2 text-center" key={index}>
            {columnName}
          </th>
        ))}
      </tr>
    );
  };

  return (
    <div className="overflow-auto max-w-[83vw] max-h-[1000px] mt-4">
      <div className="flex justify-center">
        <h3 className="font-bold text-3xl text-[#3dafaa]">Equiped Items</h3>
      </div>
      <table className="w-full border-collapse border" id="table1">
        <thead className="sticky top-0">{renderEquipedHeader()}</thead>
        <tbody>
          {tableData.map((data, index) => renderEquipedRow(data, index))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <h3 className="font-bold text-3xl text-[#3dafaa]">Returned Items</h3>
      </div>
      <table className="w-full border-collapse border">
        <thead className="sticky top-0">{renderReturnedHeader()}</thead>
        <tbody>
          {tableData.map((data, index) => renderReturnedRow(data, index))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashBoard;
