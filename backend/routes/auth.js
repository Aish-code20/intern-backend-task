const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// Test route
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // Check if user exists
    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {

        // Check DB error
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Database error" });
        }

        // Check duplicate user
        if (result && result.length > 0) {
          return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
          [name, email, hashedPassword, "user"],
          (err2) => {

            if (err2) {
              console.log(err2);
              return res.status(500).json({ msg: "Insert failed" });
            }

            res.json({ msg: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

const jwt = require("jsonwebtoken");

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "DB error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ msg: "User not found" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong password" });
      }

console.log("JWT_SECRET:", process.env.JWT_SECRET);


      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
      
    }
  );
});

      const auth = require ("../middleware/auth");

      router.get("/profile",auth,(req,res)=>{
        res.json({
            msg:"Welcome",
            user:req.user
    })
      }); 

      const admin = require("../middleware/admin");

// Admin-only route (see all users)
router.get("/all-users", auth, admin, (req, res) => {
  db.query("SELECT id,name,email,role FROM users", (err, data) => {

    if (err) return res.status(500).json({ msg: "DB error" });

    res.json(data);
  });
});


module.exports = router;
