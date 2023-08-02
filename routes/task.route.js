import express from "express";

// Import Task controllers
import {
  addNewTask,
  deleteTask,
  getTask,
  updateStatus,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Task Routes
router.post("/add-task", addNewTask);
router.get("/get-task", getTask);
router.delete("/delete-task/:id", deleteTask);
router.put("/update-task/:id", updateTask);
router.put("/task/:id/status", updateStatus);

export default router;
