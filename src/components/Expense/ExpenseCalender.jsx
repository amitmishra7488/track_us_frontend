import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  Button,
  Flex,
  Badge,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, fetchExpense } from "../../redux/thunks/expenseThunks";
import { FaCommentDollar, FaPlus, FaEye, FaRupeeSign } from "react-icons/fa"; // Import the icon
import ExpenseDetailsDrawer from "./ExpenseDetailDrawer";
import ExpenseCreationModal from "./ExpenseCreationModal";
import Cookies from "universal-cookie";
import axios from "axios";
import ExpenseReportModal from "./ExpenseReportModal";
const ExpenseCalendar = () => {
  const { colorMode } = useColorMode();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [report, setReport] = useState({});

  const tileClassName = ({ date }) => {
    const isExpenseDay = expenses.some((expense) =>
      isSameDay(new Date(expense.date), date)
    );

    return isExpenseDay ? "expense-day" : "";
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleClickDay = (date) => {
    setSelectedDate(date);
    setDrawerOpen(true);
  };

  const tileContent = ({ date }) => {
    const expensesForDay = expenses.filter((expense) =>
      isSameDay(new Date(expense.date), date)
    );

    return (
      <Box style={{ position: "relative" }}>
        {expensesForDay.length > 0 && (
          <Box>
            <FaCommentDollar />
          </Box>
        )}
      </Box>
    );
  };

  const handleCreateExpense = (newExpense) => {
    console.log("Create expense", newExpense);
    dispatch(createExpense(newExpense));
  };

  const expenseReport = async () => {
    try {
      const month = selectedMonth.getMonth() + 1;
      const year = selectedMonth.getFullYear();
      const expensereport = await axios.get(
        `https://track-us.vercel.app/user/expenseReport?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(expensereport.data);
      setReport(expensereport.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setSelectedMonth(activeStartDate);
  };

  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

  useEffect(() => {
    expenseReport();
  }, [selectedMonth, expenses]);

  return (
    <Box>
      <Flex justifyContent="flex-end" mb="0.5em">
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Expense
        </Button>
        <ExpenseCreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateExpense={handleCreateExpense}
        />
      </Flex>
      <Box p={{ base: "2", md: "4", lg: "6" }} m="auto" position="relative">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
          justify={{ base: "flex-start", md: "space-between" }}
          gap="2%"
        >
          {/* Calendar component */}
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <Calendar
              onChange={setSelectedDate}
              onActiveStartDateChange={handleActiveStartDateChange}
              value={selectedDate}
              tileClassName={tileClassName}
              onClickDay={handleClickDay}
              tileContent={tileContent}
              calendarType={"gregory"}
            />
          </Box>

          <Box
            flex="1"
            p="4"
            boxShadow={colorMode === "dark" ? "dark-lg" : "md"}
          >
            <VStack align="center" spacing={2} textAlign="center">
              <Box w="100%">
                <Badge colorScheme="blue" fontSize="lg">
                  Monthly Expense Total :{" "}
                  {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                    selectedMonth
                  ) +
                    " " +
                    selectedMonth.getFullYear()}
                </Badge>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaRupeeSign style={{ marginRight: "0.5rem" }} />
                  {report?.basedOnMonth?.total !== null
                    ? report?.basedOnMonth?.total
                    : "Not Available"}
                </Text>
              </Box>

              <Box w="100%">
                <Badge colorScheme="green" fontSize="lg">
                  Last Seven Days Total
                </Badge>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaRupeeSign style={{ marginRight: "0.5rem" }} />
                  {report ? report?.lastSevenDays?.total : "Not Available"}
                </Text>
              </Box>

              <Box w="100%">
                <Badge colorScheme="red" fontSize="lg">
                  Today's Total
                </Badge>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaRupeeSign style={{ marginRight: "0.5rem" }} />
                  {report ? report?.today?.total : "Not Available"}
                </Text>
              </Box>
              <Button
                colorScheme="teal"
                rightIcon={<FaEye />}
                onClick={() => setReportOpen(true)}
              >
                View Report
              </Button>
            </VStack>
          </Box>
        </Flex>

        <ExpenseDetailsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedDate={selectedDate}
          expenses={expenses}
        />
        <ExpenseReportModal
          isOpen={reportOpen}
          onClose={() => setReportOpen(false)}
          selectedMonth={selectedMonth}
          expenseData={report?.basedOnMonth?.expenses}
        />

        <style>
          {`
    .react-calendar {
      width: 100%;
      background: ${colorMode === "light" ? "#F8F8F8" : "#2D3748"};
      color: ${colorMode === "light" ? "black" : "white"};
      border-radius: 10px;
    }

    .react-calendar__month-view__weekdays {
      background: ${colorMode === "light" ? "#F8F8F8" : "#2D3748"};
      border-bottom: 1px solid ${colorMode === "light" ? "#E0E0E0" : "#4A5568"};
      position: sticky;
      top: 0;

      display: flex;
      justify-content: space-around;
      padding: 0.5em;
      margin: 0; /* Reset margin */
    }

    .react-calendar__month-view__days {
      row-gap: 0.5em;
      max-width: 100%;
      overflow-x: auto;
    }

    .react-calendar__tile {
      padding: 0.5em;
      height: 5vw;
      display: flex;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.3s ease;
      position: relative;
    }

    .react-calendar__tile::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${colorMode === "light" ? "#B2EBF2" : "#4A5568"};
      opacity: 0.1;
      pointer-events: none;
      border-radius: 10px;
    }
    .react-calendar__tile:hover {
      color:black;
    }

    .react-calendar__tile--active {
      background: ${colorMode === "light" ? "#B2EBF2" : "#4A5568"};
    }

    .react-calendar__tile--now {
      background: ${colorMode === "light" ? "#80CBC4" : "#228B22"};
      color: white;
    }

    .expense-day {
      background: ${colorMode === "light" ? "#EDF2F7" : "#121212"};
      filter: brightness(85%);
      color: ${colorMode === "light" ? "#121212" : "#FFFFFF"};
      padding: 0.3em 0.5em;
      margin: 0; /* Reset margin */
    }
  `}
        </style>
      </Box>
    </Box>
  );
};

export default ExpenseCalendar;
