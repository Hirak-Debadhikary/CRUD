import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { GrNext, GrPrevious } from "react-icons/gr";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;

  useEffect(() => {
    // Fetch tasks from the API
    axios
      .get("https://shy-cyan-octopus-robe.cyclic.cloud/api/v1/get-task")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  }

  const handleStatusChange = async (taskId, status) => {
    try {
      // Update the status of the task in the API
      await axios.put(
        `https://shy-cyan-octopus-robe.cyclic.cloud/api/v1/task/${taskId}/status`,
        {
          status: status,
        }
      );
      // If the status change is successful, update the task state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: status } : task
        )
      );
    } catch (error) {
      console.error("Error occurred while updating task status:", error);
    }
  };

  // Edit
  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsEditingModalOpen(true);
  };

  const handleUpdateTask = async () => {
    try {
      // Update the task in the API
      await axios.put(
        `https://shy-cyan-octopus-robe.cyclic.cloud/api/v1/update-task/${editingTask._id}`,
        editingTask
      );

      // Update the task state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? editingTask : task
        )
      );

      // Close the modal
      setIsEditingModalOpen(false);
    } catch (error) {
      console.error("Error occurred while updating task:", error);
    }
  };

  // Delete
  const handleDeleteTask = async (taskId) => {
    try {
      // Delete the task in the API
      await axios.delete(
        `https://shy-cyan-octopus-robe.cyclic.cloud/api/v1/delete-task/${taskId}`
      );

      // Remove the task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error occurred while deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };

  // Pagination
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  return (
    <Box p={2}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="15px" bg="white">
            {tasks
              .slice(
                (currentPage - 1) * tasksPerPage,
                currentPage * tasksPerPage
              )
              .map((task, index) => (
                <Tr key={task.id}>
                  <Td>
                    <Text fontSize="md" fontWeight="bold">
                      {task.title}
                    </Text>
                  </Td>
                  <Td>{task.description}</Td>
                  <Td>{formatDate(task.date)}</Td>
                  <Td>{task.status}</Td>
                  <Td w="25%">
                    <Flex>
                      <Select
                        size="sm"
                        placeholder="Select Status"
                        w="45%"
                        mr="10px"
                        onChange={(event) =>
                          handleStatusChange(task._id, event.target.value)
                        }
                      >
                        <option value="Complete">Complete</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Todo">Todo</option>
                      </Select>

                      <Button
                        colorScheme="green"
                        size="sm"
                        mr="10px"
                        borderRadius="0.5rem"
                        w="30%"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </Button>
                      {/* </Link> */}
                      <Button
                        colorScheme="red"
                        size="sm"
                        mr="10px"
                        borderRadius="0.5rem"
                        w="30%"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditingModalOpen}
        onClose={() => setIsEditingModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={editingTask?.title || ""}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  placeholder="Title..."
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={editingTask?.date || ""}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, date: e.target.value })
                  }
                  placeholder="Date..."
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  value={editingTask?.description || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description..."
                />
              </FormControl>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateTask}>
              Update
            </Button>
            <Button onClick={() => setIsEditingModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Pagination */}
      <Flex mt={4} justify="center">
        <Button
          mr={2}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          bg="transparent"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
          _hover={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <GrPrevious />
        </Button>

        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          ml={2}
          bg="transparent"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
          _hover={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            fontSize: "20px",
          }}
        >
          <GrNext />
        </Button>
      </Flex>
    </Box>
  );
};

export default TaskManager;
