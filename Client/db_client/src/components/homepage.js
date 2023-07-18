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

  const handleQueryRequest = (e) => {
    e.preventDefault();

    async function fetchData(query) {
      console.log(query);
      await fetch(`http://localhost:5000/query/${query}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.length === 0) {
            throw "no results to the given data";
          }
          console.log(response);
          setData(response);
          handleFormToggle();
        })
        .catch((err) => alert(err));
    }
    // const sql = `CALL GetFreeSeats(${FormData.p_cinema_id}, '${FormData.p_movie_name}', '${FormData.p_date}')`;
    const sql = `SELECT DISTINCT c.cinema_name, p.date, p.movie_name, r.room_name, s.row, s.seat FROM bookings b JOIN cinemas c ON b.cinema_id = c.cinema_id JOIN rooms r ON b.cinema_id = r.cinema_id AND b.room_id = r.room_id JOIN projection p ON b.cinema_id = p.cinema_id AND b.room_id = p.room_id JOIN seat s ON r.cinema_id = s.cinema_id AND r.room_id = s.room_id LEFT JOIN tickets t ON b.cinema_id = t.cinema_id AND b.room_id = t.room_id AND t.date = p.date AND t.seat_id = s.seat_id WHERE p.date = '${FormData.p_date}' AND p.movie_name = '${FormData.p_movie_name}' AND t.ticket_id IS NULL AND p.cinema_id = '${FormData.p_cinema_id}' ORDER BY r.room_name, s.row, s.seat;`;
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
          handleQueryRequest={handleQueryRequest}
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
