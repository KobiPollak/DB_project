import React, { useState } from "react";

import "../styles/manager.css"; // Import the CSS file for styling

const Manager = () => {
  const firstRow = [
    "Amount of sales per film",
    "Amount of product sales per branch",
  ];
  const secondRow = ["Best employee in every branch", "All booked rooms"];

  const [data, setData] = useState({});
  const [showAddWorkerForm, setShowAddWorkerForm] = useState(false);
  const [workerFormData, setWorkerFormData] = useState({
    p_id: "",
    p_cinema_id: "",
    p_first_name: "",
    p_last_name: "",
    p_phone_number: "",
    p_address: "",
    p_year_of_birth: "",
    p_worker_type: "",
    p_salary: "",
  });
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    p_order_number: "",
    p_date: "",
    p_total_price: "",
    p_ordering_phone: "",
    p_time: "",
    p_seller_id: "",
    p_cinema_id: "",
  });
  const [showChangeSalaryForm, setShowChangeSalaryForm] = useState(false);
  const [ChangeSalaryData, setChangeSalaryData] = useState({
    p_I_d: "",
    p_worker_type: "",
    p_salary: "",
  });

  const handleAddFormToggle = (e) => {
    if (e.target.name === "addWorker") {
      setShowAddWorkerForm(!showAddWorkerForm);
      if (showAddOrderForm) {
        setShowAddOrderForm(!showAddOrderForm);
      }
      if (showChangeSalaryForm) {
        setShowChangeSalaryForm(!showChangeSalaryForm);
      }
    } else if (e.target.name === "addOrder") {
      setShowAddOrderForm(!showAddOrderForm);
      if (showAddWorkerForm) {
        setShowAddWorkerForm(!showAddWorkerForm);
      }
      if (showChangeSalaryForm) {
        setShowChangeSalaryForm(!showChangeSalaryForm);
      }
    } else if (e.target.name === "changeSalary") {
      setShowChangeSalaryForm(!showChangeSalaryForm);
      if (showAddWorkerForm) {
        setShowAddWorkerForm(!showAddWorkerForm);
      }
      if (showAddOrderForm) {
        setShowAddOrderForm(!showAddOrderForm);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (e.target.className === "worker") {
      setWorkerFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (e.target.className === "order") {
      setOrderFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (e.target.className === "salary") {
      setChangeSalaryData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleAddWorker = (e) => {
    e.preventDefault();

    async function fetchData(worker) {
      console.log(worker);
      await fetch(`http://localhost:5000/addworker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(worker),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length === 0) {
            throw "username or password wrong. 000";
          }
        })
        .catch((err) => alert(err));
    }
    fetchData(workerFormData);

    console.log("Adding worker:", workerFormData);
    // Reset the form data after submission
    setWorkerFormData({
      p_id: "",
      p_cinema_id: "",
      p_first_name: "",
      p_last_name: "",
      p_phone_number: "",
      p_address: "",
      p_year_of_birth: "",
      p_worker_type: "",
      p_salary: "",
    });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    async function fetchData(order) {
      console.log(order);
      await fetch(`http://localhost:5000/addorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length === 0) {
            throw "username or password wrong. 000";
          }
        })
        .catch((err) => alert(err));
    }
    fetchData(orderFormData);

    console.log("Adding order:", orderFormData);
    // Reset the form data after submission
    setOrderFormData({
      p_order_number: "",
      p_date: "",
      p_total_price: "",
      p_ordering_phone: "",
      p_time: "",
      p_seller_id: "",
      p_cinema_id: "",
    });
  };

  const handleChangeSalary = (e) => {
    e.preventDefault();

    async function fetchData(change) {
      console.log(change);
      await fetch(`http://localhost:5000/changeSalary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(change),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.length === 0) {
            throw "username or password wrong. 000";
          }
        })
        .catch((err) => alert(err));
    }
    fetchData(ChangeSalaryData);

    console.log("change salary:", ChangeSalaryData);
    // Reset the form data after submission
    setChangeSalaryData({
      p_i_d: "",
      p_worker_type: "",
      p_salary: "",
    });
  };

  const handleClick = (buttonNumber) => {
    if (showAddOrderForm) {
      setShowAddOrderForm(!showAddOrderForm);
    }
    if (showAddWorkerForm) {
      setShowAddWorkerForm(!showAddWorkerForm);
    }
    if (showChangeSalaryForm) {
      setShowChangeSalaryForm(!showChangeSalaryForm);
    }

    console.log(`Button ${buttonNumber} clicked!`);
    async function getTable(sql) {
      await fetch(`http://localhost:5000/query/${sql}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((err) => alert(err));
    }
    let sql;
    if (buttonNumber === "Amount of sales per film") {
      sql =
        "SELECT  p.cinema_id, p.room_id, p.projection_id, p.movie_name, SUM(o.total_price) AS total_sales" +
        " FROM projection AS p JOIN orders AS o ON p.date = o.date JOIN seller_order AS so ON o.order_number = so.order_number " +
        "JOIN workers AS w ON so.i_d = w.i_d AND p.cinema_id = w.cinema_id WHERE o.time >= DATE_SUB(p.start_time, INTERVAL 30 MINUTE)  AND o.time <= p.end_time " +
        " GROUP BY p.movie_name, p.cinema_id, p.room_id";
    } else if (buttonNumber === "Amount of product sales per branch") {
      sql =
        "SELECT p.product_code, c.cinema_id, c.cinema_name, COUNT(op.amount) AS sales_count " +
        "FROM product p " +
        "JOIN order_product op ON p.product_code = op.product_code " +
        "JOIN orders o ON op.order_number = o.order_number " +
        "JOIN seller_order so ON o.order_number = so.order_number " +
        "JOIN sellers s ON so.i_d = s.i_d " +
        "JOIN workers w ON s.i_d = w.i_d " +
        "JOIN cinemas c ON w.cinema_id = c.cinema_id " +
        "GROUP BY p.product_code, c.cinema_id ";
    } else if (buttonNumber === "Best employee in every branch") {
      sql = "select * from cinema_max_sales";
    } else if (buttonNumber === "All booked rooms") {
      sql = "select * from booked_rooms";
    }
    getTable(sql);
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
      <h2>adding and deleting data to DB</h2>
      <button name="addWorker" onClick={(e) => handleAddFormToggle(e)}>
        Add Worker
      </button>
      <button name="addOrder" onClick={(e) => handleAddFormToggle(e)}>
        Add Order
      </button>
      <button name="changeSalary" onClick={(e) => handleAddFormToggle(e)}>
        Change Worker salary
      </button>
      {showAddWorkerForm ? (
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
      ) : showAddOrderForm ? (
        <div className="addOrder">
          <h2>Add Order</h2>
          <form onSubmit={handleAddOrder}>
            <div className="form-row">
              <input
                type="text"
                name="p_order_number"
                className="order"
                placeholder="Order Number"
                value={orderFormData.p_order_number}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="p_date"
                className="order"
                placeholder="Date"
                value={orderFormData.p_date}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="p_total_price"
                className="order"
                placeholder="Total Price"
                value={orderFormData.p_total_price}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="p_ordering_phone"
                className="order"
                placeholder="Ordering Phone Number"
                value={orderFormData.p_ordering_phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="p_time"
                className="order"
                placeholder="Time"
                value={orderFormData.p_time}
                onChange={handleFormChange}
              />
              <input
                type="text"
                name="p_seller_id"
                className="order"
                placeholder="Seller ID"
                value={orderFormData.p_seller_id}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="p_cinema_id"
                className="order"
                placeholder="Cinema ID"
                value={orderFormData.p_cinema_id}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      ) : showChangeSalaryForm ? (
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
      ) : (
        Object.keys(data).length > 0 && (
          <div className="response-table">
            <h2>Response Table</h2>
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </>
  );
};

export default Manager;