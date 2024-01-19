import React, { useContext, useState } from "react";
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
  AbsoluteCenter,
  Divider,
} from "@chakra-ui/react";
import { authContext } from "../../context/context";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { setIsLoggedIn } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const initialState = { email: "", password: "" };
  const [input, setInput] = useState(initialState);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fetchLogin = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post("https://track-us.vercel.app/user/login", {
        email,
        password,
      });
      console.log(response);

      const { user, token } = response.data;

      if (user) {
        // Set the token in cookies
        cookies.set("token", token, {
          path: "/",
          maxAge: 1 * 60 * 60,
        });
        setLoading(false);
        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/");
        }, 200);

        toast({
          title: "Login Successfully",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setLoading(false);

      toast({
        title: "Check your email and password",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = input;
    setLoading(true);
    fetchLogin(email, password);
  };
  const handleNavigate = (page) => {
    navigate(`/${page}`);
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
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
              variant="link"
              color={colorMode === "light" ? "gray.800" : "white"}
              onClick={()=>handleNavigate('reset-password')}
            >
              Forgot Password?
            </Button>
            <Button
              type="submit"
              bg={colorMode === "light" ? "#005891" : "#121212"}
              size="lg"
              w="full"
              color={colorMode === "light" ? "#121212" : "#EDF2F7"}
            >
              {loading ? <Spinner size="md" /> : "Login"}
            </Button>
            <Divider bg="#fff" />
            <Button
              bg={colorMode === "dark" ? "#005891" : "#121212"}
              size="lg"
              w="full"
              color={colorMode === "dark" ? "#121212" : "#EDF2F7"}
              onClick={()=>handleNavigate('register')}
            >
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
