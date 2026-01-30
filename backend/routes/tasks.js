const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Create task
router.post("/", auth, (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "Title required" });
  }

  db.query(
    "INSERT INTO tasks(title, user_id) VALUES(?,?)",
    [title, req.user.id],
    () => {
      res.json({ msg: "Task added" });
    }
  );
});

// Get tasks
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.user.id],
    (err, data) => {

      if (err) return res.status(500).json({ msg: "DB error" });

      res.json(data);
    }
  );
});

// Update task
router.put("/:id", auth, (req, res) => {
  const { title } = req.body;
  const taskId = req.params.id;

  if (!title) {
    return res.status(400).json({ msg: "Title required" });
  }

  db.query(
    "UPDATE tasks SET title=? WHERE id=? AND user_id=?",
    [title, taskId, req.user.id],
    (err, result) => {

      if (err) return res.status(500).json({ msg: "DB error" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Task not found" });
      }

      res.json({ msg: "Task updated" });
    }
  );
});

// Delete task
router.delete("/:id", auth, (req, res) => {
  const taskId = req.params.id;

  db.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [taskId, req.user.id],
    (err, result) => {

      if (err) return res.status(500).json({ msg: "DB error" });

      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: "Task not found" });
      }

      res.json({ msg: "Task deleted" });
    }
  );
});


module.exports = router;
