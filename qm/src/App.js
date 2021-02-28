import React from "react";

import "./App.css";

import { predicate, stringOptions, numberOptions } from "./models";

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
    const newRows = [...rows];
    newRows[i] = { ...row };
    setRows(newRows);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Rows onRowDelete={deletRow} onRowEdit={editRow} rows={rows} />
        <div className="btns-wrapper">
          <button onClick={handleAddOnClick}>And</button>
          <div className="search-btns">
            <SearchBtn onClick={handleOnSearch} />
            <ResetBtn onClick={handleResetOnClick} />
          </div>
        </div>
        <Result value={result} />
      </div>
    </div>
  );
}

export const Header = () => {
  return <h1>Search for Session</h1>;
};

export const SearchBtn = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <i className="fas fa-search"></i>
      <span className="search-text">Search</span>
    </button>
  );
};

export const ResetBtn = ({ onClick }) => {
  return <button onClick={onClick}>Reset</button>;
};

export const Result = ({ value }) => {
  return (
    <div className="result">
      {!value && (
        <span className="resultPlaceHolder">
          Your Generated SQL Statement goes here:
        </span>
      )}
      {value}
    </div>
  );
};

export const Rows = ({ rows, onEdit, onDelete }) => {
  return rows.map((item, index) => (
    <Row
      key={index}
      onRowDelete={() => onDelete(index)}
      onRowEdit={(row) => onEdit(index, row)}
    />
  ));
};

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
