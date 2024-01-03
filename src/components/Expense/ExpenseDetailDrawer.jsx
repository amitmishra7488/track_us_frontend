import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import EditExpenseModal from "./EditExpenseModal"; // Update the path
import { useDispatch, useSelector } from "react-redux";
import { updateExpenseApi } from "../../apis/expenseApi";
import {
  deleteExpense,
  updatedExpense,
} from "../../redux/thunks/expenseThunks";
import AlertDialogue from "../Common/AlertDialogue";

const ExpenseDetailsDrawer = ({ isOpen, onClose, selectedDate, expenses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const dispatch = useDispatch();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const expensesForSelectedDate = expenses.filter(
    (expense) =>
      new Date(expense.date).getDate() === selectedDate.getDate() &&
      new Date(expense.date).getMonth() === selectedDate.getMonth() &&
      new Date(expense.date).getFullYear() === selectedDate.getFullYear()
  );

  const totalAmount = expensesForSelectedDate.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleEdit = (id) => {
    console.log("edit button clicked", id);
    setSelectedExpenseId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setExpenseToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteExpense(expenseToDelete));
    setIsDeleteAlertOpen(false);
  };
  const handleCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleSaveExpense = async (newExpense) => {
    try {
      await dispatch(updatedExpense(newExpense));
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          icon={<AiOutlineClose />}
          border="1 px solid teal"
          size="md"
          bg="tomato"
          color="#fff"
          position="absolute"
          right="2"
          top="2"
          _hover={{ bg: "red", color: "#fff" }}
        />

        <DrawerHeader
          textAlign="center"
          textTransform="uppercase"
          fontSize="lg"
          fontWeight="bold"
          borderBottomWidth="1px"
          borderColor="gray.200"
          py="4"
        >
          Expense Details
        </DrawerHeader>

        <DrawerBody>
          <Box overflowY="auto" maxHeight="50vh">
            {expensesForSelectedDate.length > 0 ? (
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Description</Th>
                    <Th>Amount</Th>
                    <Th>Category</Th>
                    <Th>Status</Th>
                    <Th>Date</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {expensesForSelectedDate.map((expense) => (
                    <Tr key={expense._id}>
                      <Td>{expense.description}</Td>
                      <Td>
                        <Flex align="center">
                          <Box as={FaRupeeSign} mr="2" />
                          {expense.amount}
                        </Flex>
                      </Td>
                      <Td>{expense.category}</Td>
                      <Td>{expense.status}</Td>
                      <Td>{new Date(expense.date).toLocaleDateString()}</Td>
                      <Td>
                        <Flex>
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            icon={<FaEdit />}
                            onClick={() => handleEdit(expense._id)}
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="red"
                            icon={<FaTrash />}
                            onClick={() => handleDelete(expense._id)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Box textAlign="center" p={4}>
                No expenses for the selected date.
              </Box>
            )}
          </Box>

          <Divider my={4} />

          {expensesForSelectedDate.length > 0 && (
            <Box textAlign="right">
              <Flex align="center" justifyContent="flex-end">
                <Text fontWeight="bold">Total Amount: </Text>
                <Box as={FaRupeeSign} ml="0.5em" />
                {totalAmount}
              </Flex>
            </Box>
          )}

          <EditExpenseModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedExpenseId(null);
            }}
            expense={expensesForSelectedDate.find(
              (expense) => expense._id === selectedExpenseId
            )}
            onSave={handleSaveExpense}
          />
        </DrawerBody>
        <AlertDialogue
          isOpen={isDeleteAlertOpen}
          onClose={handleCloseDeleteAlert}
          onConfirm={handleConfirmDelete}
          title="Delete Goal"
          message="Are you sure you want to delete this goal?"
        />
      </DrawerContent>
    </Drawer>
  );
};

export default ExpenseDetailsDrawer;
