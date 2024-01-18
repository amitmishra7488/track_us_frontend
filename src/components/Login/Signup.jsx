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
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialState = { name: "", email: "", phoneNumber: "", password: "" };
  const [input, setInput] = useState(initialState);
  const [otp, setOtp] = useState("XXXX");
  const [sentOtp, setSentOtp] = useState(false);
  const { colorMode } = useColorMode();
  const [message, setMessage] = useState("Check Your Mail For OTP");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOtpGenerate = async (email, name) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://track-us.vercel.app/user/generate-otp",
        {
          email: email,
          name: name,
        }
      );

      if (response.status === 200) {
        setSentOtp(true);
        setLoading(false);
      } else if (response.status === 201) {
        setSentOtp(true);
        setLoading(false);
        setMessage(response.data.message);
      } else {
        throw new Error("Failed to generate OTP");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to generate OTP. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const fetchSignup = async (event, name, email, phoneNumber, password) => {
    event.preventDefault();
    console.log(otp);
    try {
      setLoading(true);
      const response = await axios.post("https://track-us.vercel.app/user/register", {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        otp: otp,
      });

      const { user } = response.data;
      if (user) {
        setLoading(false);
        toast({
          title: "Signup Successful",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        // Reset the form state after successful signup
        setInput(initialState);
        setOtp(0);
        setSentOtp(false);
        // Redirect to the login page
        setTimeout(() => navigate("/login"), 200);
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      setLoading(false);
      setSentOtp(false);
      setOtp(0);
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to signup. ${error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email } = input;
    handleOtpGenerate(email, name);
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
        <Heading className="heading" textAlign="center" p="0.2em">
          Signup
        </Heading>
        {sentOtp ? (
          <form
            onSubmit={(event) =>
              fetchSignup(
                event,
                input.name,
                input.email,
                input.phoneNumber,
                input.password
              )
            }
          >
            <FormControl mb="0.5em">
              <FormLabel>Enter OTP</FormLabel>
              <HStack spacing={2}>
                <PinInput
                  type="number"
                  name="otp"
                  placeholder="X"
                  value={otp}
                  required
                  color={colorMode === "light" ? "gray.800" : "white"}
                  onChange={(value) => setOtp(value)}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </FormControl>
            <Text
              color={colorMode === "light" ? "red.500" : "red.300"}
              fontSize="sm"
              mb="1"
            >
              {message}
            </Text>
            <Button
              type="submit"
              bg={colorMode === "light" ? "#005891" : "#121212"}
              size="lg"
              w="full"
              color={colorMode === "light" ? "#121212" : "#EDF2F7"}
            >
              {loading ? <Spinner size="md" /> : "Submit OTP"}
            </Button>
          </form>
        ) : (
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
                {loading ? <Spinner size="md" /> : "Submit"}
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
        )}
      </Box>
    </Box>
  );
};

export default Signup;
