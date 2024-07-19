import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDB from "./config/data_base.js";
import authRoutes from "./routes/authenticationRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";

//configure the env
dotenv.config();

// database configuration
connectToDB();

// express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my E-Commerce Application</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port number ${process.env.PORT}!!!`.bgWhite.blue.bold
  );
});

// you can run this intially inorder to generate your
// Json Web Token(JWT) SECRET_KEY
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);
