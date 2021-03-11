import React from 'react';

import './App.css';

import { predicate, stringOptions, numberOptions } from './models';

function App() {
  const initialRow = {
    predicate: predicate[0],
    option: stringOptions[0],
    value: '',
    betweenValue1: '',
    betweenValue2: '',
  };

  const [result, setResult] = React.useState('');
  const [rows, setRows] = React.useState([initialRow]);

  const handleAddOnClick = (e) => {
    const row = initialRow;
    const newRows = [...rows, row];
    setRows(newRows);
  };

  const handleResetOnClick = () => {
    setRows([]);
    setResult('');
    setRows([initialRow]);
  };

  const handleOnSearch = () => {
    let sql = rows.reduce((result, el) => {
      if (el.predicate.type === 'string') {
        if (el.option.name === 'contains') {
          result += `${el.predicate.column} ${el.option.sql} '%${el.value}%'`;
        } else if (el.option.name === 'start with') {
          result += `${el.predicate.column} ${el.option.sql} '${el.value}%'`;
        } else {
          result += `${el.predicate.column} ${el.option.sql} '${el.value}'`;
        }
      } else {
        if (el.option.name === 'between') {
          result += `${el.predicate.column} ${el.option.sql} ${el.betweenValue1} AND ${el.betweenValue2}`;
        } else if (el.option.name === 'in list') {
          result += `${el.predicate.column} ${el.option.sql} (${el.value})`;
        }
      }

      result += ' AND ';
      return result;
    }, 'SELECT * FROM session WHERE ');

    const withoutAnd = sql.length - 5;

    sql = sql.substr(0, withoutAnd);

    setResult(sql);
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
        <Rows rows={rows} onEdit={editRow} onDelete={deletRow} />
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
    <div className="result animated">
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
      row={item}
    />
  ));
};

export const Row = ({ onRowDelete, onRowEdit, row }) => {
  const [selectedPredicate, setSelectedPredicate] = React.useState(
    row.predicate
  );
  const [selectedOption, setSelectedOption] = React.useState(row.option);
  const [value, setValue] = React.useState('');
  const [betweenValue1, setBetweenValue1] = React.useState('');
  const [betweenValue2, setBetweenValue2] = React.useState('');

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
      selectedPredicate.type === 'number' ? numberOptions : stringOptions;

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

  const handleFirstInputOnChange = (e) => {
    setBetweenValue1(e.target.value);
    const row = {
      predicate: selectedPredicate,
      option: selectedOption,
      value: '',
      betweenValue1: e.target.value,
      betweenValue2: betweenValue2,
    };

    onRowEdit(row);
  };

  const handleSecondInputOnChange = (e) => {
    setBetweenValue2(e.target.value);
    const row = {
      predicate: selectedPredicate,
      option: selectedOption,
      value: '',
      betweenValue1: betweenValue1,
      betweenValue2: e.target.value,
    };

    onRowEdit(row);
  };

  var deleteSign = '\u2715';

  return (
    <div className="row">
      <div className="deleteBtn" onClick={() => onRowDelete()}>
        {deleteSign}
      </div>
      <select
        className="form-control"
        onChange={handlePredicateOnChange}
        value={selectedPredicate.key}
      >
        {predicate.map((item, index) => (
          <option key={index} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedOption.name === 'between' && <span className="span">is</span>}
      <select className="form-control" onChange={handleOparationOnChange}>
        {selectedPredicate.type === 'number' &&
          numberOptions.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        {selectedPredicate.type === 'string' &&
          stringOptions.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
      {selectedOption.name === 'between' && (
        <>
          <input
            className="form-control xsm"
            type="number"
            placeholder="0"
            onChange={(e) => handleFirstInputOnChange(e)}
            required
          />
          <span className="span">and</span>
          <input
            className="form-control xsm"
            type="number"
            placeholder="0"
            onChange={(e) => handleSecondInputOnChange(e)}
            required
          />
        </>
      )}
      {selectedOption.name !== 'between' && (
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
