import express from "express";
import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js";
import commandRouter from "./routes/commands.js";
import productRoute from "./routes/products.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRoute);
server.use("/api/product", productRoute);
server.use("/api/cart", cartRoute);
server.use("/api/command", commandRouter);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
