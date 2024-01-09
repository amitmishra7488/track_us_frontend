import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import DashboardContent from "./DashboardContent";
import { Routes, Route } from "react-router-dom";
import GoalDashboard from "../Goals/GoalDashboard";
import SingleGoalPage from "../Goals/SingleGoalPage";
import ExpenseCalendar from "../Expense/ExpenseCalender";
import PortfolioDashboard from "../Portfolio/PortfolioDashboard";
import BankPortfolio from "../Portfolio/BankPortfolio";
import IncompleteComponent from "../IncompleteComponent/IncompleteComponent";
import SinglePortfolioPage from "../Portfolio/SinglePortfolioPage";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const sidebarWidth = isLargerThan768 ? "15%" : "5%";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(isLargerThan768);
  }, [isLargerThan768]);

  return (
    <Flex direction="column" height="100vh">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Flex flexGrow={1} overflow="hidden">
        {isSidebarOpen && (
          <Box
            width={{ base: "100%", md: sidebarWidth }}
            transform={{
              base: "translateX(0)",
              md: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
            }}
            transition="transform 0.5s"
          >
            <Sidebar />
          </Box>
        )}
        <Box
          flexGrow={1}
          p="4"
          overflow="auto"
          css={{
            "::-webkit-scrollbar": {
              width: "12px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/goals" element={<GoalDashboard />} />
            <Route path="/goal/:goalId" element={<SingleGoalPage />} />
            <Route path="/expenses" element={<ExpenseCalendar />} />
            <Route path="/portfolio" element={<PortfolioDashboard />} />
            <Route path="/bank-portfolio" element={<BankPortfolio />} />
            <Route path="/dreams" element={<IncompleteComponent />} />
            <Route path="/achievement" element={<IncompleteComponent />} />
            <Route path="/comingsoon" element={<IncompleteComponent />} />
            <Route path="/portfolio/:portfolioId" element={<SinglePortfolioPage />} />



            {/* Add more routes as needed */}
          </Routes>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Dashboard;
