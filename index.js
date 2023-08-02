import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import connectDB from "./config/db.js";
import router from "./routes/task.route.js";

const PORT = process.env.PORT || 2000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Use body-parser for JSON data parsing
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded data parsing

// Routes
app.use("/api/v1", router);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
