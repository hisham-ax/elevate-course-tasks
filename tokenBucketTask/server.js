import express from "express";
import rateLimiter  from "./rateLimiter.js";

const app = express();

app.use(express.json());

app.use("/api", rateLimiter);

app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    message: "Products returned",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
