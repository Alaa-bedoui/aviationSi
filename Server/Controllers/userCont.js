const pool = require("../database/index");
const bcrypt = require("bcrypt"); // Make sure to install bcrypt if not already done

// Create a new user
async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the username or email already exists
    const checkUserSql = "SELECT * FROM users WHERE username = ? OR email = ?";
    const [existingUsers] = await pool.query(checkUserSql, [username, email]);

    if (existingUsers.length > 0) {
      const existingUsernames = existingUsers.filter(
        (user) => user.username === username
      );
      const existingEmails = existingUsers.filter(
        (user) => user.email === email
      );

      if (existingUsernames.length > 0) {
        return res.status(409).json({ message: "Username already exists" });
      }
      if (existingEmails.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 rounds for hashing
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await pool.query(sql, [username, email, hashedPassword]);

    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
}

// Get a user by email
async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]); // Return the first user found
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Error fetching user data", error });
  }
}

// Handle user login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Get the user by email
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [email]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    res
      .status(200)
      .json({
        message: "Login successful",
        userId: user.id,
        username: user.username,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  loginUser,
};
