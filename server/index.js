//api documentation
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
//package imports
// const express = require("express"); - this is common js
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//security imports
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//files import
import connectDb from "./config/db.js";
//routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoute.js";
//middleware import
import errorMiddleware from "./middlewares/errorMiddleware.js";

//DOT ENV config
dotenv.config();

//mongodb connection
connectDb();

//Swagger api config
//swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

//rest object
const app = express();

//middlewares
app.use(helmet()); // secures the header section
app.use(xss()); // secures fron cross-side scripting attacks
app.use(mongoSanitize()); // secures the mongoDb datbase
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));
app.use(cookieParser());
app.use(morgan("dev"));

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//main api endpoint
app.get("/", (req, res) => {
  res.json({ message: "job-portal main api end-point" });
});

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
  console.log(
    `Node Server Running in ${process.env.DEV_MODE} on Port no ${PORT} `.bgCyan
      .white
  );
});
