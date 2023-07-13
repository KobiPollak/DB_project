import React from "react";

const GetSeatsForm = (props) => {
  const { handleQueryWorker, FormData, handleFormChange } = props;

  return (
    <div className="query-form">
      <h2>Get Empty Seats</h2>
      <form onSubmit={handleQueryWorker}>
        <div className="form-row">
          <input
            type="text"
            name="p_cinema_id"
            placeholder="Cinema ID"
            value={FormData.p_cinema_id}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_date"
            placeholder="Date"
            value={FormData.p_date}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_movie_name"
            className="worker"
            placeholder="Movie Name"
            value={FormData.p_movie_name}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Find</button>
      </form>
    </div>
  );
};

export default GetSeatsForm;
