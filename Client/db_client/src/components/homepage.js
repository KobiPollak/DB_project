import React, { useState } from "react";
import "../styles/homepage.css"; // Import the CSS file for styling

import GetSeatsForm from "./getseatsform";
import TableDisplay from "./tableDisplay";

const HomePage = () => {
  const firstRow = ["Cinemas", "Movies", "Events"];
  const secondRow = ["Workers", "Products", "Suppliers"];

  const [data, setData] = useState({});

  const [showQueryForm, setShowQueryForm] = useState(false);
  const [FormData, setFormData] = useState({
    p_cinema_id: "",
    p_date: "",
    p_movie_name: "",
  });

  const handleFormToggle = () => {
    setShowQueryForm(!showQueryForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleQueryWorker = (e) => {
    e.preventDefault();

    async function fetchData(query) {
      console.log(query);
      await fetch(`http://localhost:5000/query/${query}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.length === 0) {
            throw "username or password wrong. 000";
          }
          console.log(response);
          setData(response);
          handleFormToggle();
        })
        .catch((err) => alert(err));
    }
    const sql = `CALL GetFreeSeats(${FormData.p_cinema_id}, '${FormData.p_movie_name}', '${FormData.p_date}')`;
    fetchData(sql);
  };

  const handleClick = (buttonNumber) => {
    if (showQueryForm) {
      setShowQueryForm(!showQueryForm);
    }
    console.log(`Button ${buttonNumber} clicked!`);
    async function getTable(table) {
      await fetch(`http://localhost:5000/${table}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((err) => alert(err));
    }
    getTable(buttonNumber);
    // Replace the console.log with your desired function logic
  };

  return (
    <>
      <div className="title">
        <h1>welcome to the world's leading cinemas chain</h1>
      </div>
      <div className="keyboard">
        <div className="firstRow">
          {firstRow.map((value) => (
            <button key={value} onClick={() => handleClick(value)}>
              {value}
            </button>
          ))}
        </div>
        <div className="secondRow">
          {secondRow.map((value) => (
            <button key={value} onClick={() => handleClick(value)}>
              {value}
            </button>
          ))}
        </div>
      </div>
      <h2>More query's</h2>
      <button name="emptySeats" onClick={() => handleFormToggle()}>
        Get free seats for movie
      </button>
      {showQueryForm ? (
        <GetSeatsForm
          handleQueryWorker={handleQueryWorker}
          FormData={FormData}
          handleFormChange={handleFormChange}
        />
      ) : (
        Object.keys(data).length > 0 && <TableDisplay data={data} />
      )}
    </>
  );
};

export default HomePage;
