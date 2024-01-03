import React, { useContext, useEffect } from "react";
import logo from "../../images/logo.png";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import {
  FaUser,
  FaChevronDown,
  FaPowerOff,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdLightMode, MdDarkMode, MdManageAccounts } from "react-icons/md";
import { authContext } from "../../context/context";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const dashboardNavination = () => {
    navigate("/");
  };

  return (
    <Box
      bg={colorMode === "light" ? "teal.500" : "teal.800"}
      p={2}
      color={colorMode === "light" ? "black" : "white"} // Set text color based on color mode
    >
      <Flex alignItems="center">
        <Box>
          <IconButton
            icon={isSidebarOpen ? <FaTimes /> : <FaBars />}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            variant="outline"
          />
        </Box>
        <Box
          _hover={{ cursor: "pointer" }}
          maxW="70px"
          maxH="50px"
          m={0}
          ml="1em"
          onClick={dashboardNavination}
        >
          <Image maxW="100%" maxH="100%" src={logo} alt="logo" />
        </Box>

        <Spacer />

        <Box>
          <Heading
            size="md"
            fontStyle="italic"
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          >
            TRACK YOURSELF
          </Heading>
        </Box>
        <Spacer />
        <Box mr="0.5em">
          <ProfileMenu colorMode={colorMode} />
        </Box>
        <IconButton
          icon={colorMode === "light" ? <MdLightMode /> : <MdDarkMode />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

const ProfileMenu = ({ colorMode }) => {
  const { isLoggedIn } = useContext(authContext);

  return isLoggedIn ? <LoggedInMenu colorMode={colorMode} /> : <LoggedOutMenu />;
};

const LoggedInMenu = ({ colorMode }) => {
  const { setIsLoggedIn } = useContext(authContext);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        handleLogout();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  
  const handleLogout = () => {
    cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  
  const handle = () => {
    alert("You have logged out");
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />} fontSize="sm" colorScheme={colorMode === "light" ? "teal" : "teal"}>
        <FaUser />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handle} icon={<MdManageAccounts size={20} />} colorScheme={colorMode === "light" ? "teal" : "teal"}>
          My Account
        </MenuItem>

        <MenuDivider />
        <MenuItem icon={<FaPowerOff size={20} />} onClick={handleLogout} colorScheme="red">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const LoggedOutMenu = () => {
  return (
    <Button rightIcon={<FaPowerOff />} fontSize="sm">
      Login
    </Button>
  );
};

export default Navbar;

