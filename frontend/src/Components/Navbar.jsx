import React from "react";
import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  extendTheme,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

const Navbar = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1rem"
        bg="blue.300"
        color="white"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Task Management App
        </Text>
        <Flex>
          <Link to="/">
            <Button
              variant="ghost"
              mr="2"
              _hover={{ bg: "blue.600", color: "white" }}
              border="1px solid white"
            >
              Add Task
            </Button>
          </Link>

          <Link to="/task">
            <Button
              border="1px solid white"
              variant="ghost"
              mr="2"
              _hover={{ bg: "blue.600", color: "white" }}
            >
              All Tasks
            </Button>
          </Link>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Navbar;
