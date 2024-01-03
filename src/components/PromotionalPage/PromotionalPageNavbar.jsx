// PromotionalPageNavbar.js
import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { IoLogoReact } from "react-icons/io5";

const PromotionalPageNavbar = ({ handleLogin, handleSignup }) => {
  const { colorMode } = useColorMode();
  const [isTransparent, setIsTransparent] = useState(true);

  const handleScroll = () => {
    const scrolled = window.scrollY;
    setIsTransparent(scrolled < 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      bg={isTransparent ? "transparent" : (colorMode === "light" ? "rgba(50, 50, 50, 0.9)" : "rgba(10, 10, 10, 0.9)")}
      p={2}
      color={colorMode === "light" ? "black" : "white"}
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
      transition="background 0.3s ease, color 0.3s ease"
    >
      <Flex alignItems="center" justify="space-between">
        <IconButton
          icon={<IoLogoReact />}
          fontSize="2xl"
          variant="ghost"
          color={colorMode === "light" ? "teal.500" : "teal.300"}
        />

        <Flex align="center">
          <Button onClick={handleLogin} variant="ghost" mr="4">
            Login
          </Button>
          <Button onClick={handleSignup} variant="outline">
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PromotionalPageNavbar;
