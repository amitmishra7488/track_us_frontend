import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { FaMoneyBill, FaCoins, FaLandmark, FaQuestion } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const PortfolioDashboard = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate("/");
  };

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  // Generate the breadcrumb dynamically
  const breadcrumb = pathSegments.map((segment, index) => (
    <BreadcrumbItem
      key={segment}
      isCurrentPage={index === pathSegments.length - 1}
    >
      <BreadcrumbLink onClick={() => handleNavigation(segment)}>
        {segment.charAt(0).toUpperCase() + segment.slice(1)}
      </BreadcrumbLink>
    </BreadcrumbItem>
  ));

  // Add "Dashboard" as the first element in the breadcrumb
  breadcrumb.unshift(
    <BreadcrumbItem key="dashboard">
      <BreadcrumbLink onClick={() => handleNavigation("")}>
        Dashboard
      </BreadcrumbLink>
    </BreadcrumbItem>
  );

  const iconContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    width: "10em",
    height: "10em",
    borderRadius: "8px",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
  };

  const iconStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20%",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow:
      colorMode === "dark"
        ? "0 -20px 10px -20px rgba(255, 255, 255, 0.45) inset, 20px 0 10px -20px rgba(255, 255, 255, 0.45) inset"
        : "0 -20px 10px -20px rgba(0, 0, 0, 0.45) inset, 20px 0 10px -20px rgba(0, 0, 0, 0.45) inset",
  };

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <Box p="4">
      {/* Navigation Bar */}
      <Flex justify="space-between" align="center" mb="0.5em">
        <Breadcrumb
          spacing="0.5em"
          separator={<IoIosArrowForward color="gray.500" />}
        >
          {breadcrumb}
        </Breadcrumb>
      </Flex>

      {/* Portfolio Icons */}
      <Flex justify="space-around" flexWrap="wrap" gap="0.5em">
        {/* Bank Portfolio */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation("bank-portfolio")}
        >
          <Box style={iconStyles}>
            <FaLandmark size={32} color="gold" />
          </Box>
          <Text mt="2" fontWeight="semibold">
            Bank Portfolio
          </Text>
        </Box>

        {/* Stock Portfolio */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation("comingsoon")}
        >
          <Box style={iconStyles}>
            <FaMoneyBill size={32} color="blue" />
          </Box>
          <Text mt="2" fontWeight="semibold">
            Stock Portfolio
          </Text>
        </Box>

        {/* Crypto Portfolio */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation("comingsoon")}
        >
          <Box style={iconStyles}>
            <FaCoins size={32} color="green" />
          </Box>
          <Text mt="2" fontWeight="semibold">
            Crypto Portfolio
          </Text>
        </Box>

        {/* Other Portfolio */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation("comingsoon")}
        >
          <Box style={iconStyles}>
            <FaQuestion size={32} color="purple" />
          </Box>
          <Text mt="2" fontWeight="semibold">
            Other Portfolio
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PortfolioDashboard;
