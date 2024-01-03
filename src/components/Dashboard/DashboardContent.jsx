import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { FaTrophy, FaChartPie, FaBed, FaRupeeSign } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const DashboardContent = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
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
    boxShadow: colorMode === "dark"
      ? "0 -20px 10px -20px rgba(255, 255, 255, 0.45) inset, 20px 0 10px -20px rgba(255, 255, 255, 0.45) inset"
      : "0 -20px 10px -20px rgba(0, 0, 0, 0.45) inset, 20px 0 10px -20px rgba(0, 0, 0, 0.45) inset",
  };

  const handleNavigation = (page)=>{
    navigate(`/${page}`)
  }
  
  
  return (
    <Box p="4">
      <Flex justify="space-around" flexWrap="wrap" gap="0.5em">
        {/* Goal */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation('goals')}
        >
          <Box style={iconStyles} >
            <GoGoal size={32} color="blue" />
          </Box>
          <Text mt="2" fontWeight="semibold">Goals</Text>
        </Box>

        {/* Portfolio */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation('portfolio')}
        >
          <Box style={iconStyles} >
            <FaRupeeSign size={32} color="green" />
          </Box>
          <Text mt="2" fontWeight="semibold">Portfolio</Text>
        </Box>

        {/* Achievement */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation('achievement')}
        >
          <Box style={iconStyles} >
            <FaTrophy size={32} color="gold" />
          </Box>
          <Text mt="2" fontWeight="semibold">Achievements</Text>
        </Box>

        {/* Dreams */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation('dreams')}
        >
          <Box style={iconStyles} >
            <FaBed size={32} color="purple" />
          </Box>
          <Text mt="2" fontWeight="semibold">Dreams</Text>
        </Box>

        {/* Expense */}
        <Box
          p="4"
          style={iconContainerStyle}
          _hover={{
            boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)",
            transform: "scale(1.1)",
          }}
          onClick={() => handleNavigation('expenses')}
        >
          <Box style={iconStyles} >
            <FaChartPie size={32} color="red" />
          </Box>
          <Text mt="2" fontWeight="semibold">Expense</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardContent;
