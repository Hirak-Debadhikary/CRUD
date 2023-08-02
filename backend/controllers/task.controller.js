import asyncHandler from "express-async-handler";
import TaskModel from "../models/task.Model.js";

// Add Income
const addNewTask = asyncHandler(async (req, res) => {
  try {
    // Extract the task details from the request body
    const { title, description, date } = req.body;

    // Create a new task instance using the TaskModel
    const newTask = new TaskModel({
      title,
      description,
      date,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Send the saved task as a response
    res.status(201).json(savedTask);
  } catch (error) {
    // If there is an error, handle it using the asyncHandler middleware
    res
      .status(500)
      .json({ message: "Failed to add a new task", error: error.message });
  }
});

// Get Added Task
const getTask = asyncHandler(async (req, res) => {
  try {
    // Fetch all task data from the database and sort by createdAt in descending order
    const task = await TaskModel.find().sort({ createdAt: -1 });

    // Send the task data in the response
    res.status(200).json(task);
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server Error in GetTask" });
  }
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;

  try {
    // Find the task by ID and delete it from the database
    const task = await TaskModel.findByIdAndDelete(id);

    // Check if the task was found in the database
    if (!task) {
      // If task is not found, return a 404 status code with a corresponding message
      return res.status(404).json({ message: "Task not found" });
    }

    // If task was successfully deleted, send a 200 status code with a success message
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    // If any error occurs during the deletion process, handle it here
    return res.status(500).json({ message: "Server Error in deleting task" });
  }
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;

  try {
    // Find the task by ID in the database
    const task = await TaskModel.findById(id);

    // Check if the task was found in the database
    if (!task) {
      // If task is not found, return a 404 status code with a corresponding message
      return res.status(404).json({ message: "Task not found" });
    }

    // Extract the updated task details from the request body
    const { title, description, status } = req.body;

    // Update the task properties
    task.title = title;
    task.description = description;
    task.status = status;

    // Save the updated task to the database
    const updatedTask = await task.save();

    // Send the updated task as a response
    res.status(200).json(updatedTask);
  } catch (error) {
    // If any error occurs during the update process, handle it here
    return res.status(500).json({ message: "Server Error in updating task" });
  }
});

// Update Task status endpoint
const updateStatus = asyncHandler(async (req, res) => {
  // Extract the project ID from the request parameters
  const { id } = req.params;
  // Extract the new status from the request body
  const { status } = req.body;

  try {
    // Find the task by its ID in the database
    const task = await TaskModel.findById(id);

    // If the task doesn't exist, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }

    // Define an array of valid task statuses
    const validStatuses = ["In-Progress", "Complete", "Todo"];

    // If the provided status is not valid, return a 400 error
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid task status" });
    }

    // If the task is already in the desired status, return a 400 error
    if (task.status === status) {
      return res.status(400).json({ error: `task is already ${status}` });
    }
    // Update the task's status to the new value
    task.status = status;
    // Save the updated task in the database
    await task.save();
    // Return the updated status in the response
    res.json({ status: task.status });
  } catch (error) {
    // Log the error message if there's an error
    console.error("Failed to update task status", error);
    // Return a 500 error if there's a failure in updating the task status
    res.status(500).json({ error: "Failed to update task status" });
  }
});

export { addNewTask, getTask, deleteTask, updateTask, updateStatus };
