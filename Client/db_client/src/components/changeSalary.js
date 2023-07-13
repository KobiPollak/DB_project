import React from "react";

const ChangeSalary = (props) => {
  const { handleChangeSalary, ChangeSalaryData, handleFormChange } = props;

  return (
    <div className="changeSalary">
      <h2>Change Salary</h2>
      <form onSubmit={handleChangeSalary}>
        <div className="form-row">
          <input
            type="text"
            name="p_i_d"
            className="salary"
            placeholder="Worker ID"
            value={ChangeSalaryData.p_i_d}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="p_worker_type"
            className="salary"
            placeholder="Worker Type"
            value={ChangeSalaryData.p_worker_type}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="p_salary"
            className="salary"
            placeholder="New Salary"
            value={ChangeSalaryData.p_salary}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default ChangeSalary;
