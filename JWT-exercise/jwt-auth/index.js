const express = require("express");

const app = express();
const PORT = 8888;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const users = [
  { id: 1, username: "clarkKent", password: "superman" },
  { id: 2, username: "bruceWayne", password: "batman" }
];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/time", (req, res) => {
  let time = new Date();
  time = time.toLocaleTimeString();

  res.status(200).send(`time is ${time}`);
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send("Error. Please enter the correct username and password");
    return;
  }

  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  );

  /* jwt get token */
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    "mykey",
    { expiresIn: "3 hours" }
  );

  res.status(200).send({ access_token: token });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
