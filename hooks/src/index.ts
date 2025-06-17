import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

const client = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hooks server is running!");
});

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;
  console.log(`Received hook for user ${userId} and zap ${zapId}`, body);

  try {
    await client.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    // TODO: push to Kafka or Redis queue here

    res.status(200).json({ message: "ZapRun triggered and outbox queued." });
  } catch (error) {
    console.error("Error handling zap:", error);
    res.status(500).json({ error: "Failed to process hook" });
  }
});

app.listen(port, () => {
  console.log(`Hooks server is running at http://localhost:${port}`);
});
