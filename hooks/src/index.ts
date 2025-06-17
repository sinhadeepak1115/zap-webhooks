import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hooks server is running!");
});

app.post("/hooks/catch/:userId/:zapId", (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  console.log(`Received hook for user ${userId} and zap ${zapId}`);
});

app.listen(port, () => {
  console.log(`Hooks server is running at http://localhost:${port}`);
});
