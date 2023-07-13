import React from "react";

const AddWorker = (props) => {
  const { handleAddWorker, workerFormData, handleFormChange } = props;

  return (
    <div className="add-worker-form">
      <h2>Add Worker</h2>
      <form onSubmit={handleAddWorker}>
        <div className="form-row">
          <input
            type="text"
            name="p_id"
            className="worker"
            placeholder="ID"
            value={workerFormData.p_id}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_cinema_id"
            className="worker"
            placeholder="Cinema ID"
            value={workerFormData.p_cinema_id}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_first_name"
            className="worker"
            placeholder="First Name"
            value={workerFormData.p_first_name}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_last_name"
            className="worker"
            placeholder="Last Name"
            value={workerFormData.p_last_name}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_phone_number"
            className="worker"
            placeholder="Phone Number"
            value={workerFormData.p_phone_number}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_address"
            className="worker"
            placeholder="Address"
            value={workerFormData.p_address}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_year_of_birth"
            className="worker"
            placeholder="Year of Birth"
            value={workerFormData.p_year_of_birth}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_worker_type"
            className="worker"
            placeholder="Worker Type"
            value={workerFormData.p_worker_type}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_salary"
            className="worker"
            placeholder="Salary"
            value={workerFormData.p_salary}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddWorker;
