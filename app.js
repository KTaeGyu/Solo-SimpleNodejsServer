const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let id = 2;
const members = [
  {
    id: 1,
    email: "email@domain.com",
    username: "username",
    password: "password",
    nickname: "nickname",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/member", (req, res) => {
  res.json(members);
});

app.post("/api/member", (req, res) => {
  const { email, username, password, nickname } = req.body;
  members.push({
    id: id++,
    email,
    username,
    password,
    nickname,
  });
  return res.send("success");
});

app.listen(4000, () => {
  console.log("server start");
});
