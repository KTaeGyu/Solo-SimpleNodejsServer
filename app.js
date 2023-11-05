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
let id = 3;
const members = [
  {
    id: 1,
    email: "email@domain.com",
    name: "name",
    pwd: "pwd",
    nickname: "nickname",
  },
  {
    id: 1,
    email: "xorb269@naver.com",
    name: "KTG",
    pwd: "vofldhs12#",
    nickname: "GyuTae",
  },
];

let postId = 3;
const waffles = [
  {
    postId: 1,
    content: "첫 번째 게시물",
    createdAt: 231006,
    updatedAt: 231007,
    likes: 1,
    memberId: 1,
  },
  {
    postId: 2,
    content: "두 번째 게시물",
    createdAt: 231106,
    updatedAt: 231107,
    likes: 2,
    memberId: 2,
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
        memberId: members[member].id,
        email: members[member].email,
        name: members[member].name,
        pwd: members[member].pwd,
        nickname: members[member].nickname,
      });
    }
  }
  return res.json({ errorCode: 400 });
});

app.post("/waffles", (req, res) => {
  const { memberId, content } = req.body;
  if (content === "") {
    return res.json({ errorCode: 404, errorMsg: "content cannot be null" });
  }
  if (isNaN(memberId)) {
    return res.json({ errorCode: 401, errorMsg: "You should be logged in" });
  }
  const nowDate = new Date();
  console.log(nowDate.getDate());
  waffles.push({
    postId: postId++,
    content: content,
    createdAt: nowDate,
    updatedAt: nowDate,
    likes: 0,
    memberId: memberId,
  });
  return res.json({ errorCode: 201 });
});

app.get("/waffles", (req, res) => {
  return res.json(waffles);
});

app.listen(4000, () => {
  console.log("server start");
});
