const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "bedoui123",
  database: "aviation",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check the connection by getting a connection from the pool
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = pool;
