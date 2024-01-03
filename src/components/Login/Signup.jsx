import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Spinner,
  useToast,
  useColorMode,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const initialState = { name: "", email: "", phoneNumber: "", password: "" };
  const [input, setInput] = useState(initialState);
  const { colorMode } = useColorMode();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchSignup = async (name, email, phoneNumber, password) => {
    console.log(name, email, phoneNumber, password);
    try {
      const response = await axios.post("https://track-us.vercel.app/user/register", {
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        password:password,
      });
      console.log(response);
      const { user } = response.data;
      if (user) {
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 200);

        toast({
          title: "Signup Successful",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: `Error in signup ${error}`,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, phoneNumber, password } = input;
    setLoading(true);
    fetchSignup(name, email, phoneNumber, password);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      className="login-page-container"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgImage={
        colorMode === "light"
          ? `url(https://wallpapercave.com/wp/wp8786419.jpg)`
          : `url(https://wallpapercave.com/wp/wp8791360.jpg)`
      }
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        className="login-form-container"
        p={6}
        border="1px"
        borderRadius="md"
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        bg={
          colorMode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(55, 65, 81, 0.8)"
        }
        maxW="md"
        w="full"
        boxShadow="md"
      >
        <Heading className="heading" textAlign="center" p="1em">
          Signup
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                color={colorMode === "light" ? "gray.800" : "white"}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                color={colorMode === "light" ? "gray.800" : "white"}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                color={colorMode === "light" ? "gray.800" : "white"}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                color={colorMode === "light" ? "gray.800" : "white"}
              />
            </FormControl>

            <Button
              type="submit"
              bg={colorMode === "light" ? "#005891" : "#121212"}
              size="lg"
              w="full"
              color={colorMode === "light" ? "#121212" : "#EDF2F7"}
            >
              {loading ? <Spinner size="md" /> : "Signup"}
            </Button>

            <Divider bg="#fff" />
            <Button
              bg={colorMode === "dark" ? "#005891" : "#121212"}
              size="lg"
              w="full"
              color={colorMode === "dark" ? "#121212" : "#EDF2F7"}
              onClick={handleLogin}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
