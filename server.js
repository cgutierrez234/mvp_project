import dotenv from "dotenv";
import express from "express";
import pool from "./db.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/goals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM goals");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot fetch goals from database");
  }
});

app.get("/goals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM goals WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Cannot locate goal at that id");
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Cannot fetch goal from the database");
  }
});

app.post("/goals", async (req, res) => {
  const { goal } = req.body;
  try {
    const result = await pool.query("INSERT INTO goals (goal) VALUES ($1)", [
      goal,
    ]);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to commit new goal to database");
  }
});

app.put("/goals/:id", async (req, res) => {
  const { id } = req.params;
  const { goal } = req.body;
  try {
    const result = await pool.query(
      "UPDATE goals SET goal = $1 WHERE id=$2 RETURNING*",
      [goal, id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Cannot update goal at that id");
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update goal in the database");
  }
});

app.delete("/goals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM goals WHERE id=$1 RETURNING*",
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Unable to delete goal at the given id");
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to delete goal from database");
  }
});

// create listener

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
