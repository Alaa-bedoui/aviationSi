const pool = require("../database/index");

async function getAllHoraires(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM horaires");
    console.log(rows);

    res.send(rows);
  } catch (error) {
    console.error("Error fetching all crews:", error);
    throw error;
  }
}

async function getcrewByColumn(req, res) {
  try {
    // Validate that userid is provided
    const { userId } = req.params;
    console.log(req.params);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const sql = "SELECT * FROM horaires WHERE crew_idcrew = ?";
    const [rows] = await pool.query(sql, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching crew by user ID:", error);
    res.status(500).json({ message: "Error fetching crew data", error });
  }
}

module.exports = {
  getAllHoraires,
  getcrewByColumn,
};
