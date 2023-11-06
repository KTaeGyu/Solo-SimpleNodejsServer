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
baseProfileURL = "https://cdn-icons-png.flaticon.com/128/1946/1946429.png";
let id = 3;
const members = [
  {
    id: 1,
    email: "email@domain.com",
    name: "name",
    pwd: "pwd",
    nickname: "nickname",
    profileURL: baseProfileURL,
    createdAt: "Nov 1",
    updatedAt: "Nov 1",
  },
  {
    id: 2,
    email: "xorb269@naver.com",
    name: "KTG",
    pwd: "vofldhs12#",
    nickname: "GyuTae",
    profileURL:
      "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MjNfNTQg/MDAxNjU1OTYzMzQzNzkz.jKd1UhjT1JFsFsr3nzd4I82_VFmZGIcr1b-w9xvpOAQg.DGaE4_J6gmThjVlV6JjJ_dCQd0U-Jx2eWUgPbx3NGv8g.JPEG.susang3/%ED%99%8D%EB%8C%80%EC%82%AC%EC%A7%84%EA%B4%80_%ED%99%8D%EB%8C%80%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_(3).jpg?type=w800",
    createdAt: "Nov 2",
    updatedAt: "Nov 2",
  },
];

let postId = 3;
const waffles = [
  {
    postId: 1,
    content: "첫 번째 게시물",
    createdAt: "Nov 6",
    updatedAt: "Nov 7",
    likes: 1,
    memberId: 1,
  },
  {
    postId: 2,
    content: "두 번째 게시물",
    createdAt: "Nov 6",
    updatedAt: "Nov 7",
    likes: 2,
    memberId: 2,
  },
];

let commentId = 5;
const comments = [
  {
    commentId: 1,
    content: "첫 번째 게시글의 첫 댓글",
    createdAt: "Nov 6",
    updatedAt: "Nov 6",
    memberId: 1,
    postId: 1,
  },
  {
    commentId: 2,
    content: "첫 번째 게시글의 둘째 댓글",
    createdAt: "Nov 6",
    updatedAt: "Nov 6",
    memberId: 2,
    postId: 1,
  },
  {
    commentId: 3,
    content: "두 번째 게시글의 첫 댓글",
    createdAt: "Nov 6",
    updatedAt: "Nov 6",
    memberId: 1,
    postId: 2,
  },
  {
    commentId: 4,
    content: "두 번째 게시글의 둘째 댓글",
    createdAt: "Nov 6",
    updatedAt: "Nov 6",
    memberId: 2,
    postId: 2,
  },
];

const follow = [
  {
    memberId: 1,
    followinfId: 2,
    createdAt: "Nov 2",
  },
  {
    memberId: 2,
    followinfId: 1,
    createdAt: "Nov 4",
  },
];

// variables
const monthConverter = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

// api server
app.get("/", function (req, res) {
  res.send("Hello World");
});

// auth
app.get("/auth/signup", (req, res) => {
  return res.json(members);
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

// waffle
app.post("/waffles", (req, res) => {
  const { memberId, content } = req.body;
  if (content === "") {
    return res.json({ errorCode: 404, errorMsg: "content cannot be null" });
  }
  if (isNaN(memberId)) {
    return res.json({ errorCode: 401, errorMsg: "You should be logged in" });
  }
  const fullDate = new Date();
  const month = monthConverter[fullDate.getMonth()];
  const date = fullDate.getDate();
  const nowDate = `${month} ${date}`;
  const instance = {
    postId: postId++,
    content: content,
    createdAt: nowDate,
    updatedAt: nowDate,
    likes: 0,
    memberId: memberId,
  };
  waffles.push(instance);
  return res.json({
    errorCode: 201,
    errorMsg: "posting succeed",
    instance,
  });
});

app.get("/waffles", (req, res) => {
  return res.json(waffles);
});

app.get("/waffles/:waffleId", (req, res) => {
  const { waffleId } = req.params;
  for (const waffle of waffles) {
    if (waffleId == waffle.postId) {
      return res.json({ errorCode: 200, instance: waffle });
    }
  }
  return res.json({ errorCode: 404 });
});

app.patch("/waffles/:waffleId", (req, res) => {
  return;
});

app.delete("/waffles/:waffleId", (req, res) => {
  return;
});

app.post("/waffles/:waffleId/like", (req, res) => {
  return;
});

app.post("/waffles/:waffleId/unlike", (req, res) => {
  return;
});

// comment
app.post("/waffles/:waffleId/comments", (req, res) => {
  return;
});

app.get("/waffles/:waffleId/comments", (req, res) => {
  return;
});

app.get("/waffles/:waffleId/comments/:commentId", (req, res) => {
  return;
});

app.patch("/waffles/:waffleId/comments/:commentId", (req, res) => {
  return;
});

app.delete("/waffles/:waffleId/comments/:commentId", (req, res) => {
  return;
});

// member
app.get("/members", (req, res) => {
  return;
});

app.patch("/members", (req, res) => {
  return;
});

app.delete("/members", (req, res) => {
  return;
});

app.get("/members/:memberId", (req, res) => {
  return;
});

app.post("/members/checkpwd", (req, res) => {
  return;
});

app.patch("/members/profile-image", (req, res) => {
  return;
});

app.get("/members/follow", (req, res) => {
  return;
});

app.post("/members/follow", (req, res) => {
  return;
});

app.post("/members/unfollow", (req, res) => {
  return;
});

app.listen(4000, () => {
  console.log("server start");
});
