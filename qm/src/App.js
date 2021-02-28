import React from "react";

import "./App.css";

const predicate = [
  {
    key: 1,
    name: "Domain",
    type: "string",
    column: "domain",
  },
  {
    key: 2,
    name: "User Email",
    type: "string",
    column: "user_email",
  },
  {
    key: 3,
    name: "Screen Width",
    type: "number",
    column: "screen_width",
  },
  {
    key: 4,
    name: "Screen Height",
    type: "number",
    column: "screen_height",
  },
  {
    key: 5,
    name: "# of Visit",
    type: "number",
    column: "visits",
  },
  {
    key: 6,
    name: "First Name",
    type: "string",
    column: "user_first_name",
  },
  {
    key: 7,
    name: "Last Name",
    type: "string",
    column: "user_last_name",
  },
  {
    key: 8,
    name: "Page response time (ms)",
    type: "number",
    column: "page_response",
  },
  {
    key: 9,
    name: "Page path",
    type: "string",
    column: "path",
  },
];

const stringOptions = [
  { name: "equals", sql: "=" },
  { name: "contains", sql: "LIKE" },
  { name: "start with", sql: "LIKE" },
  { name: "in list", sql: "IN" },
];

const numberOptions = [
  { name: "equals", sql: "=" },
  { name: "between", sql: "BETWEEN" },
  { name: "greater than", sql: ">" },
  { name: "less than", sql: "<" },
  { name: "in list", sql: "IN" },
];

function App() {
  const initialRow = {
    predicate: predicate[0],
    option: stringOptions[0],
    value: "",
  };

  const [result, setResult] = React.useState("");
  const [rows, setRows] = React.useState([
    {
      predicate: predicate[0],
      option: stringOptions[0],
      value: "",
    },
  ]);

  const handleAddOnClick = (e) => {
    const row = {
      predicate: predicate[0],
      option: stringOptions[0],
      value: "",
    };
    const newRows = [...rows, row];
    setRows(newRows);
  };

  const handleResetOnClick = () => {
    setRows([initialRow]);
    setResult("");
  };

  const handleOnSearch = () => {
    let result = "";
    result += "SELECT * FROM session ";
    result += "WHERE ";

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].option.name === "contains") {
        result += `${rows[i].predicate.column} ${rows[i].option.sql} '%${rows[i].value}%'`;
      } else if (rows[i].option.name === "start with") {
        result += `${rows[i].predicate.column} ${rows[i].option.sql} '${rows[i].value}%'`;
      } else {
        result += `${rows[i].predicate.column} ${rows[i].option.sql} '${rows[i].value}'`;
      }
      if (i !== rows.length - 1) result += " AND ";
    }
    setResult(result);
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
    console.log("row: ", row);

    const newRows = [...rows];
    newRows[i] = { ...row };
    setRows(newRows);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Search for Session</h1>

        {rows.map((item, index) => (
          <Row
            key={index}
            onRowDelete={() => deletRow(index)}
            onRowEdit={(row) => editRow(index, row)}
          />
        ))}
        <div className="btns-wrapper">
          <button onClick={handleAddOnClick}>And</button>
          <div className="search-btns">
            <button onClick={handleOnSearch}>
              <i className="fas fa-search"></i>
              <span className="search-text">Search</span>
            </button>
            <button onClick={handleResetOnClick}>Reset</button>
          </div>
        </div>
        <div>result:{result}</div>
      </div>
    </div>
  );
}

export const Row = ({ onRowDelete, onRowEdit }) => {
  const [selectedPredicate, setSelectedPredicate] = React.useState(
    predicate[0]
  );
  const [selectedOption, setSelectedOption] = React.useState(stringOptions[0]);

  const [value, setValue] = React.useState("");

  const handlePredicateOnChange = (e) => {
    const selected = predicate.find((item) => item.key === +e.target.value);
    setSelectedPredicate(selected);
    const row = {
      predicate: selected,
      option: selectedOption,
      value: value,
    };

    onRowEdit(row);
  };
  const handleOparationOnChange = (e) => {
    const options =
      selectedPredicate.type === "number" ? numberOptions : stringOptions;

    const selected = options.find((item) => item.name === e.target.value);

    setSelectedOption(selected);
    const row = {
      predicate: selectedPredicate,
      option: selected,
      value: value,
    };

    onRowEdit(row);
  };

  const handleInputOnChange = (e) => {
    setValue(e.target.value);
    const row = {
      predicate: selectedPredicate,
      option: selectedOption,
      value: e.target.value,
    };

    onRowEdit(row);
  };
  const getClassName = (initial, size = "md") => {
    return initial;
  };

  var deleteSign = "\u2715";
  return (
    <div className="row">
      <div className="deleteBtn" onClick={() => onRowDelete()}>
        {deleteSign}
      </div>
      <select
        className={getClassName("form-control")}
        onChange={handlePredicateOnChange}
      >
        {predicate.map((item, index) => (
          <option key={index} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedOption === "between" && <span>is</span>}
      <select
        className={getClassName("form-control")}
        onChange={handleOparationOnChange}
      >
        {selectedPredicate.type === "number" &&
          numberOptions.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        {selectedPredicate.type === "string" &&
          stringOptions.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
      {selectedOption === "between" && (
        <>
          <input
            className="form-control xsm"
            type="number"
            placeholder="0"
            onChange={(e) => null}
            required
          />
          <span>and</span>
          <input
            className="form-control xsm"
            type="number"
            placeholder="0"
            onChange={(e) => null}
            required
          />
        </>
      )}
      {selectedOption !== "between" && (
        <input
          className="form-control md"
          type="text"
          placeholder="website.com"
          onChange={(e) => handleInputOnChange(e)}
          required
        />
      )}
    </div>
  );
};

export default App;
