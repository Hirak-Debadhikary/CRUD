import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Alert,
  AlertIcon,
  FormControl,
  VStack,
  Button,
  Textarea,
  FormLabel,
  Input,
  Heading,
} from "@chakra-ui/react";
const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");

      // Perform client-side validation before submitting
      if (!title || !description) {
        setErrorMessage("All fields are required!");
        return;
      }

      // Prepare the TaskObject to be sent in the request body
      const TaskObject = {
        title,
        description,
        date,
      };

      // Make a POST request to the add-task endpoint
      const response = await axios.post(
        "https://shy-cyan-octopus-robe.cyclic.cloud/api/v1/add-task",
        TaskObject
      );

      // You can add more logic here, like showing a success message or redirecting to another page
      setSuccessMessage("Task added successfully!");
      setErrorMessage("");
    } catch (error) {
      // You can add more logic here, like showing an error message to the user
      setErrorMessage("Failed to add Task data");
      setSuccessMessage("");
    }
  };
  useEffect(() => {
    // Set up a timer to remove the error and success messages after 2 seconds
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  return (
    <Box maxW="md" mx="auto" mt={20} p={4} borderWidth="1px" borderRadius="lg">
      <Heading mb={4} textAlign="center" fontSize="2xl">
        Add Task
      </Heading>
      {errorMessage && (
        <Alert status="error" mb={4} borderRadius="5px" fontSize="lg">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}{" "}
      {successMessage && (
        <Alert status="success" mb={4} borderRadius="5px" fontSize="lg">
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Add Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddTaskForm;
