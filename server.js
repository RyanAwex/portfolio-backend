import express from "express";
import cors from "cors";
import { sql } from "./config/db.js";
import projectsRoute from "./routes/projects.js";
import skillsRoute from "./routes/skills.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-cyan-kappa-13.vercel.app/",
    ],
    credentials: true,
  })
);

app.use("/api/projects", projectsRoute);
app.use("/api/skills", skillsRoute);

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      description TEXT,
      tech TEXT[],  -- Array of technologies
      github VARCHAR(255),
      demo VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    await sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => console.log("Server running on port", PORT));
});
