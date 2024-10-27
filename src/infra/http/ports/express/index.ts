import "dotenv/config";
import express from "express";

const PORT = process.env.SERVER_PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("API ok!");
});

app.listen(PORT, () => {
  console.log(`🟢 Server Express is running on Port ${PORT}!`);
});

export { app };
