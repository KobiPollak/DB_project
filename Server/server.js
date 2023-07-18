const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kobi09pollak",
  database: "sqlproject",
});

app.get("/:table", (req, res) => {
  const table = req.params.table;

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql;
    if (table === "Movies") {
      sql = "select movie_name, start_time, end_time, date from projection";
    } else if (table === "Events") {
      sql = "select * from bookings";
    } else if (table === "Products") {
      sql = "select * from product";
    } else {
      sql = `select * from ${table}`;
    }
    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log("query done");
      console.log(results);
      res.statusCode = 200;
      res.send(results);
    });
  });
});

app.get("/query/:sql", (req, res) => {
  const sql = req.params.sql;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query('SET SESSION sql_mode = ""', (error) => {
      if (error) {
        console.error("Error setting sql_mode:", error);
        return;
      }
      con.query(sql, function (err, results, fields) {
        if (err) throw err;
        console.log("query done");
        console.log(results);
        const data = results.map((result) => ({ ...result }));
        res.statusCode = 200;
        res.send(data);
      });
    });
  });
});

app.post("/addworker", (req, res) => {
  const {
    p_id,
    p_cinema_id,
    p_first_name,
    p_last_name,
    p_phone_number,
    p_address,
    p_year_of_birth,
    p_worker_type,
    p_salary,
  } = req.body;
  if (!p_id || !p_cinema_id) {
    res
      .status(400)
      .json({ error: "cannot add worker without id and cinema_id." });
    return;
  }
  const insertWorkerQuery = `INSERT INTO workers (i_d, cinema_id, first_name, last_name, phone_number, address, year_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  let values = [
    p_id,
    p_cinema_id,
    p_first_name,
    p_last_name,
    p_phone_number,
    p_address,
    p_year_of_birth,
  ];
  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
  });
  const test = `select * from workers where i_d =${p_id} `;
  con.query(test, (err, result) => {
    if (err) {
      throw err;
      // console.error(err);
      // res.status(500).json({ error: "Internal server error" });
    } else if (result.length > 0) {
      console.log("User exist");
      res.json({ message: "User exist" });
      return;
    }
    con.query(insertWorkerQuery, values, (err, result) => {
      if (err) {
        throw err;
        // console.error(err);
        // res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("User registered successfully");
        //   res.json({ message: "User registered successfully" });
      }
    });
    let salaryQuery;
    if (p_worker_type === "seller") {
      salaryQuery = `INSERT INTO sellers (i_d, salary) VALUES (?, ?)`;
    } else {
      salaryQuery = `INSERT INTO maintenance (i_d, salary) VALUES (?, ?)`;
    }
    values = [p_id, p_salary];
    con.query(salaryQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error!" });
      } else {
        console.log("User registered successfully");
        res.json({ message: "User registered successfully" });
      }
    });
  });
});

app.post("/addorder", (req, res) => {
  const {
    p_order_number,
    p_date,
    p_total_price,
    p_ordering_phone,
    p_time,
    p_seller_id,
    p_cinema_id,
  } = req.body;
  if (!p_order_number) {
    res.status(400).json({ error: "cannot add order without order number." });
    return;
  }
  const insertOrderQuery = `CALL InsertOrder(${p_order_number}, "${p_date}", ${p_total_price}, "${p_ordering_phone}", '${p_time}', ${p_seller_id}, ${p_cinema_id})`;
  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
  });
  con.query(insertOrderQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Order added successfully");
      //   res.json({ message: "User registered successfully" });
    }
  });
});

app.post("/changeSalary", (req, res) => {
  const { p_i_d, p_worker_type, p_salary } = req.body;
  if (!p_i_d || !p_salary) {
    res.status(400).json({ error: "cannot change salary without details." });
    return;
  }
  let changeSalaryQuery;
  if (p_worker_type === "seller") {
    changeSalaryQuery = `UPDATE sellers set salary = ${p_salary} where i_d = ${p_i_d}`;
  } else {
    changeSalaryQuery = `UPDATE maintenance set salary = ${p_salary} where i_d = ${p_i_d}`;
  }

  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
  });
  con.query(changeSalaryQuery, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("salary changed successfully");
      res.json({ message: "salary changed successfully" });
    }
  });
});

const port = 5000; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
