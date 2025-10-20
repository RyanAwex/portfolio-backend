import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await sql`SELECT * FROM projects ORDER BY id ASC`;

    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "No projects in the database" });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.log("Error in projects route", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
