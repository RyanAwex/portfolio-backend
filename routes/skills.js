import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const skills = await sql`SELECT * FROM skills ORDER BY id ASC`;

    if (!skills) {
      return res
        .status(404)
        .json({ success: false, message: "No skills in the database" });
    }

    res.status(200).json(skills);
  } catch (error) {
    console.log("Error in skills route", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
