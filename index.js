const express = require("express");
const { generateRegisterOptions } = require("@simplewebauthn/server");

const PORT = 3000;
const app = express();

app.use(express.static("./public"));
app.use(express.json());

const userStore = {};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const id = `user_${Date.now()}`;

  const user = {
    id,
    username,
    password,
  };
  userStore[id] = user;
  console.log("Registeration sucessfull", userStore[id]);
  return res.json({ id });
});

app.post("/register-challenge", async (req, res) => {
  const { userId } = req.body;

  if (!userStore[userId])
    return res.status(404).json({ error: "user not found" });

  const challengePayload = await generateRegisterOptions({
    rpID: "localhost",
    rpName: "My local machine",
    username: user.username,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT} `);
});
