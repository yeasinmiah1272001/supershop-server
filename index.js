import express from "express";
import cors from "cors";
const app = express();
import "dotenv/config";
import productRouter from "./routes/productRouter.js";
import dbConnect from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

dbConnect();
cloudinaryConnect();
app.get("/", (req, res) => {
  res.send("supper shop Server!");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
