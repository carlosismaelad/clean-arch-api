import "dotenv/config";
import express from "express";

const PORT = process.env.SERVER_PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`🟢 Server Express is running on Port ${PORT}!`);
});

export { app };
