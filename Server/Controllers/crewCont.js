const pool = require("../database/index");

async function getcrewByColumn(req, res) {
  console.log("Function getcrewByColumn invoked");

  const { value, query } = req.params;
  console.log(`Query: ${query}, Value: ${value}`);

  try {
    const sql = `SELECT * FROM crew WHERE ?? = ?`;
    const [crew] = await pool.query(sql, [query, value]);
    res.send(crew);
    console.log("Response sent:", crew);
  } catch (error) {
    console.error(`Error fetching crew by ${query}:`, error);
    res.status(500).send("Internal Server Error");
  }
}
console.log("read");

async function getAllcrews(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM crew");
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.error("Error fetching all crews:", error);
    throw error;
  }
}

module.exports = {
  getAllcrews,
  getcrewByColumn,
};
