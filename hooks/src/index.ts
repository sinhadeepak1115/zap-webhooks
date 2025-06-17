import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hooks server is running!");
});

app.post("/hooks/catch/:userId/:zapId", (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;

  // store db in new trigger

  // push it on to a queue (kaflka/redis)
});

app.listen(port, () => {
  console.log(`Hooks server is running at http://localhost:${port}`);
});
