import React from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaRupeeSign, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx"; // Import xlsx library

const ExpenseReportModal = ({
  isOpen,
  onClose,
  selectedMonth,
  expenseData,
}) => {
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(selectedMonth);

  const handleDownload = () => {
    const selectedColumns = ["description", "amount", "category", "status", "date"];
    const filteredData = expenseData.map(item =>
      selectedColumns.reduce((acc, column) => {
        if (column === "date") {
            acc[column] = new Date(item[column]).toLocaleDateString();
          } else {
            acc[column] = item[column];
          }
        return acc;
      }, {})
    );
    const totalAmount = expenseData.reduce((acc, item) => acc + item.amount, 0);
    filteredData.push({ description: "Total Amount", amount: totalAmount });
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Expense_Report_${monthYear}`);
    XLSX.writeFile(wb, `Expense_Report_${monthYear}.xlsx`);
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Flex
            justify="space-between"
            mt="4"
            alignItems="center"
            padding="0 4%"
          >
            <Text>EXPENSE REPORT : {monthYear.toUpperCase()}</Text>
            <Button
              leftIcon={<FaDownload />}
              size="xs"
              colorScheme="teal"
              onClick={handleDownload}
            >
              Download
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflowX="auto">
            {expenseData && expenseData.length > 0 ? (
              <>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Description</Th>
                      <Th>Amount</Th>
                      <Th>Category</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {expenseData.map((expense, index) => (
                      <Tr key={index}>
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
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            ) : (
              <Text>No data available</Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseReportModal;
