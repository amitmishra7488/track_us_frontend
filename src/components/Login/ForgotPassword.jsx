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
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("Check Your Mail For OTP");
  const [checkPassword, setCheckPassword] = useState(false);
  const { colorMode } = useColorMode();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpGenerate = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://track-us.vercel.app/user/generate-otp-password",
        {
          email: email,
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

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://track-us.vercel.app/user/verify-otp-password",
        {
          email: email,
          otp: otp,
        }
      );

      if (response.status === 200) {
        setSentOtp(true);
        setLoading(false);
        setVerified(true);
      } else {
        throw new Error("Verification failed invalid otp");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to verify OTP. ${error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    console.log(password);
    try {
      console.log(password);
      setLoading(true);
      const response = await axios.put(
        "https://track-us.vercel.app/user/reset-password",
        {
          email: email,
          otp: otp,
          newPassword: password,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        toast({
          title: "Password Changed",
          description: `Successfully Password Changed`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setTimeout(() => navigate("/login"), 200);
      } else {
        throw new Error("Verification failed invalid otp");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast({
        title: "Error",
        description: `Session Expired Retry Again`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleChangePassword = (e) => {
    setConfirmPassword(e.target.value);
  
    // Use the state updater callback to ensure you work with the latest state
    setCheckPassword((prevCheckPassword) => password === e.target.value);
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      className="forgot-password-page-container"
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
        className="forgot-password-form-container"
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
          Forgot Password
        </Heading>
        {sentOtp ? (
          <form onSubmit={handleOtpSubmit}>
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
                  isDisabled={verified}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>

                <Button
                  type="submit"
                  isDisabled={verified}
                  variant={verified ? "outline" : "solid"}
                  borderWidth={2}
                  borderColor={
                    verified
                      ? "#4CAF50"
                      : colorMode === "light"
                      ? "#005891"
                      : "#121212"
                  }
                  bg={
                    verified
                      ? "transparent"
                      : colorMode === "light"
                      ? "#005891"
                      : "#121212"
                  }
                  color={
                    verified
                      ? "#4CAF50"
                      : colorMode === "light"
                      ? "#EDF2F7"
                      : "#fff"
                  }
                  _hover={{
                    bg: verified
                      ? "transparent"
                      : colorMode === "light"
                      ? "#004266"
                      : "#101010",
                    color: verified
                      ? "#4CAF50"
                      : colorMode === "light"
                      ? "#EDF2F7"
                      : "#fff",
                  }}
                  size="md"
                  w="max-content"
                  leftIcon={verified && <TiTickOutline size={20} />}
                >
                  {loading && !verified ? (
                    <Spinner size="md" />
                  ) : verified ? (
                    "Verified"
                  ) : (
                    "Verify"
                  )}
                </Button>
              </HStack>
            </FormControl>
            <Text
              color={colorMode === "light" ? "red.500" : "red.300"}
              fontSize="sm"
              mb="1"
            >
              {message}
            </Text>
          </form>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleOtpGenerate(email);
            }}
          >
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

              <Button
                type="submit"
                bg={colorMode === "light" ? "#005891" : "#121212"}
                size="lg"
                w="full"
                color={colorMode === "light" ? "#121212" : "#EDF2F7"}
              >
                {loading ? <Spinner size="md" /> : "Send OTP"}
              </Button>

              <Divider bg="#fff" />
              <Link
                onClick={handleLogin}
                color={colorMode === "light" ? "#005891" : "#EDF2F7"}
                fontSize="sm"
              >
                Back to Login
              </Link>
            </VStack>
          </form>
        )}

        {verified && (
          // Password Input
          <form onSubmit={handlePasswordSubmit}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleChangePassword}
                required
              />
            </FormControl>
            <Text
              color={
                checkPassword
                  ? colorMode === "light"
                    ? "green.500"
                    : "green.300"
                  : colorMode === "light"
                  ? "red.500"
                  : "red.300"
              }
              fontSize="sm"
              mb="1"
            >
              {checkPassword ? "Password Matched" : "Password Not Matched"}
            </Text>
            <Button
              type="submit"
              isDisabled={!checkPassword || loading}
              isLoading={loading}
              variant="solid"
              borderWidth={2}
              borderColor={colorMode === "light" ? "#005891" : "#121212"}
              bg={colorMode === "light" ? "#005891" : "#121212"}
              color={colorMode === "light" ? "#121212" : "#EDF2F7"}
              _hover={{
                bg: colorMode === "light" ? "#004266" : "#101010",
              }}
              size="lg"
              w="max-content"
              
            >
              {loading ? <Spinner size="md" /> : "Reset Password"}
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
