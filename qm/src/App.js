import React from "react";

import "./App.css";

const predicate = [
  {
    key: 1,
    name: "Domain",
    type: "string",
  },
  {
    key: 2,
    name: "User Email",
    type: "string",
  },
  {
    key: 3,
    name: "Screen Width",
    type: "number",
  },
  {
    key: 4,
    name: "Screen Height",
    type: "number",
  },
  {
    key: 5,
    name: "# of Visit",
    type: "number",
  },
  {
    key: 6,
    name: "First Name",
    type: "string",
  },
  {
    key: 7,
    name: "Last Name",
    type: "string",
  },
  {
    key: 8,
    name: "Page response time (ms)",
    type: "number",
  },
  {
    key: 9,
    name: "Page path",
    type: "string",
  },
];

const stringOptions = ["equals", "contains", "start with", "in list"];

const numberOptions = [
  "equals",
  "between",
  "greater than",
  "less than",
  "in list",
];

function App() {
  const handleAddOnClick = (e) => {
    setRowsCount(rowsCount + 1);
  };
  const handleResetOnClick = () => {
    setRowsCount(1);
  };
  const deletRow = (i) => {
    console.log("DELETE: ", i);
  };
  const [rowsCount, setRowsCount] = React.useState(1);

  const renderRows = () => {
    let result = [];
    for (let i = 0; i < rowsCount; i++) {
      result.push(<Row onRowDelete={() => deletRow(i)} />);
    }
    return result;
  };

  return (
    <div className="App">
      <div>
        <h1>Search for Session</h1>
        {renderRows()}
        <div className="andBtn">
          <button onClick={handleAddOnClick}>And</button>
        </div>
        <hr />
        <button>Search</button>
        <button onClick={handleResetOnClick}>Reset</button>
      </div>
    </div>
  );
}

export const Row = ({ onRowDelete }) => {
  console.log("ROW");

  const [selectedPredicat, setSelectedPredicat] = React.useState(predicate[0]);
  const [selectedOption, setSelectedOption] = React.useState(stringOptions[0]);

  const resetOperations = () => {
    setSelectedOption(stringOptions[0]);
  };

  const handleOnChange = (e) => {
    const selected = predicate.find((item) => item.key === +e.target.value);
    setSelectedPredicat(selected);
    resetOperations();
  };
  const handleOparationOnChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="row">
      <button onClick={() => onRowDelete()}>x</button>
      <select onChange={handleOnChange}>
        {predicate.map((item) => (
          <option value={item.key}>{item.name}</option>
        ))}
      </select>
      {selectedOption === "between" && <b> is </b>}
      <select onChange={handleOparationOnChange}>
        {selectedPredicat.type === "number" &&
          numberOptions.map((item) => <option value={item}>{item}</option>)}
        {selectedPredicat.type === "string" &&
          stringOptions.map((item) => <option value={item}>{item}</option>)}
      </select>
      {selectedOption === "between" && (
        <>
          <input
            type="number"
            placeholder="0"
            onChange={(e) => null}
            required
          />
          <b>AND</b>
          <input
            type="number"
            placeholder="0"
            onChange={(e) => null}
            required
          />
        </>
      )}
      {selectedOption !== "between" && (
        <input
          type="text"
          placeholder="website.com"
          onChange={(e) => null}
          required
        />
      )}
    </div>
  );
};

export default App;
