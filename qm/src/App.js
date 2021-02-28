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
  const initialRow = {
    predicate: predicate[0],
    option: stringOptions[0],
    value: {},
  };

  const [rows, setRows] = React.useState([
    {
      predicate: predicate[0],
      option: stringOptions[0],
      value: {},
    },
  ]);
  const handleAddOnClick = (e) => {
    const row = {
      predicate: predicate[0],
      option: stringOptions[0],
      value: {},
    };
    const newRows = [...rows, row];
    setRows(newRows);
  };
  const handleResetOnClick = () => {
    setRows([initialRow]);
  };

  const deletRow = (i) => {
    if (rows.length === 1) {
    } else {
      const newRows = [...rows];
      newRows.splice(i, 1);
      setRows(newRows);
    }
  };

  const editRow = (i, row) => {
    console.log("editRow value: ", row);
    console.log("editRow index: ", i);

    const newRows = [...rows];
    newRows[i] = row;
    setRows(newRows);
  };

  return (
    <div className="App">
      <div>
        <h1>Search for Session</h1>
        {/* {renderRows()} */}
        {rows.map((item, index) => (
          <Row
            key={index}
            onRowDelete={() => deletRow(index)}
            onRowEdit={(row) => editRow(index, row)}
          />
        ))}
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

export const Row = ({ onRowDelete, onRowEdit }) => {
  const [selectedPredicate, setSelectedPredicate] = React.useState(
    predicate[0]
  );
  const [selectedOption, setSelectedOption] = React.useState(stringOptions[0]);

  const resetOperations = () => {
    setSelectedOption(stringOptions[0]);
  };

  const handlePredicateOnChange = (e) => {
    const selected = predicate.find((item) => item.key === +e.target.value);
    setSelectedPredicate(selected);
    // resetOperations();
    const row = {
      predicate: selectedPredicate,
      option: selectedOption,
    };

    onRowEdit(row);
  };
  const handleOparationOnChange = (e) => {
    setSelectedOption(e.target.value);
    const row = {
      predicate: selectedPredicate,
      option: selectedOption,
    };

    onRowEdit(row);
  };

  var checkmark = "\u2715";
  return (
    <div className="row">
      <span className="deleteBtn" onClick={() => onRowDelete()}>
        {checkmark}
      </span>
      <select onChange={handlePredicateOnChange}>
        {predicate.map((item, index) => (
          <option key={index} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedOption === "between" && <span> is </span>}
      <select onChange={handleOparationOnChange}>
        {selectedPredicate.type === "number" &&
          numberOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        {selectedPredicate.type === "string" &&
          stringOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>
      {selectedOption === "between" && (
        <>
          <input
            type="number"
            placeholder="0"
            onChange={(e) => null}
            required
          />
          <span> and </span>
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
