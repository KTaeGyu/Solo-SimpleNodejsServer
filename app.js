// express
const express = require("express");
const app = express();

const cors = require("cors");
const { json } = require("body-parser");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// DB
let id = 2;
const members = [
  {
    id: 1,
    email: "email@domain.com",
    name: "name",
    pwd: "pwd",
    nickname: "nickname",
  },
];

// api server
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/auth/signup", (req, res) => {
  res.json(members);
});

app.post("/auth/signup", (req, res) => {
  const { email, name, pwd, nickname } = req.body;
  if (email === "" || name === "" || pwd === "" || nickname === "") {
    return res.json({ errorCode: 400 });
  }
  members.push({
    id: id++,
    email,
    name,
    pwd,
    nickname,
  });
  return res.json({ errorCode: 201 });
});

app.post("/auth/signup/email", (req, res) => {
  const { email } = req.body;
  for (const member in members) {
    if (members[member].email === email) {
      return res.json({ errorCode: 400 });
    }
  }
  return res.json({ errorCode: 200 });
});

app.post("/auth/signup/nickname", (req, res) => {
  const { nickname } = req.body;
  for (const member in members) {
    if (members[member].nickname === nickname) {
      return res.json({ errorCode: 400 });
    }
  }
  return res.json({ errorCode: 200 });
});

app.post("/auth/login", (req, res) => {
  const { email, pwd } = req.body;
  for (const member in members) {
    if (members[member].email === email && members[member].pwd === pwd) {
      return res.json({
        errorCode: 200,
        email: members[member].email,
        name: members[member].name,
        pwd: members[member].pwd,
        nickname: members[member].nickname,
      });
    }
  }
  return res.json({ errorCode: 400 });
});

app.listen(4000, () => {
  console.log("server start");
});
