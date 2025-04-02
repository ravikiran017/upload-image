const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Multer Setup (File Upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GitHub API Headers
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

// Upload Image to GitHub
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageBase64 = image.buffer.toString("base64");
    const imagePath = `uploads/${Date.now()}-${image.originalname}`;

    // GitHub API URL
    const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${imagePath}`;

    // Upload Image to GitHub
    const response = await axios.put(
      githubUrl,
      {
        message: `Upload image: ${image.originalname}`,
        content: imageBase64,
        branch: process.env.GITHUB_BRANCH,
      },
      { headers }
    );

    const imageUrl = response.data.content.download_url;

    // Store in PostgreSQL
    const result = await pool.query(
      "INSERT INTO images (name, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, description, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Images
app.get("/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM images ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
