import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, fetchExpense } from "../../redux/thunks/expenseThunks";
import { FaCommentDollar, FaPlus } from "react-icons/fa"; // Import the icon
import ExpenseDetailsDrawer from "./ExpenseDetailDrawer";
import ExpenseCreationModal from "./ExpenseCreationModal";

const ExpenseCalendar = () => {
  const { colorMode } = useColorMode();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

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
      <Box
        p={{ base: "2", md: "4", lg: "6" }}
        maxW="800px"
        m="auto"
        position="relative"
        zIndex="101"
      >
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          onClickDay={handleClickDay}
          tileContent={tileContent}
          calendarType={"gregory"}
        />

        <ExpenseDetailsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedDate={selectedDate}
          expenses={expenses}
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
