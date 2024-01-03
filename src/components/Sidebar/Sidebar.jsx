// Sidebar.js
import React from "react";
import { Box, VStack, Link, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "black" : "gray.200";
  const hoverColor = colorMode === "dark" ? "teal.100" : "teal.200";

  return (
    <Box
      className="left-sidebar-container"
      p="4"
      height="100%"
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing="4" align="left">
        <Link
          as={RouterLink}
          to="/goals"
          width="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          px="2"
          py="1"
          borderRadius="md"
          _hover={{ bg: hoverColor }}
        >
          Goals
        </Link>
        <Link
          as={RouterLink}
          to="/portfolio"
          width="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          px="2"
          py="1"
          borderRadius="md"
          _hover={{ bg: hoverColor }}
        >
          Portfolio
        </Link>
        <Link
          as={RouterLink}
          to="/expenses"
          width="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          px="2"
          py="1"
          borderRadius="md"
          _hover={{ bg: hoverColor }}
        >
          Expenses
        </Link>
        {/* Add more links or components as needed */}
      </VStack>
    </Box>
  );
};

export default Sidebar;




