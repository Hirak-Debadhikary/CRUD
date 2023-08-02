import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTaskForm from "./AddTaskForm";
import TaskManager from "./TaskManager";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AddTaskForm />} />
        <Route path="/task" element={<TaskManager />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
