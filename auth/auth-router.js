const router = require("express").Router();
const brcypt = require("bcrypt");
const db = require("../database/dbConfig");
const config = require("../api/jwtConfig");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  console.log(req.body);
  // implement registration
  const { username, password } = req.body;
  const rounds = process.env.HASH_ROUNDS || 12;
  const hashed = brcypt.hashSync(password, rounds);
  const user = { username, password: hashed };

  db("users")
    .insert(user)
    .then((u) => res.status(201).json(u))
    .catch((err) => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;
  db("users")
    .where({ username })
    .then(([user]) => {
      if (user && brcypt.compareSync(password, user.password)) {
        const token = generateToken({ id: user.id, username: user.username });

        res
          .status(200)
          .json({ message: `Welcome back, ${user.username}`, token });
      } else {
        res.status(401).json({ message: "forbidden" });
      }
    });
});

function generateToken(payload) {
  return jwt.sign(payload, config.secret, config.options);
}

module.exports = router;
