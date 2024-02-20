import React, { useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import { FaRupeeSign, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx"; // Import xlsx library

const ExpenseReportModal = ({
  isOpen,
  onClose,
  selectedMonth,
  expenseData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(selectedMonth);

  const handleDownload = () => {
    // Download logic remains the same
  };

  const filteredExpenseData = expenseData
    ? expenseData.filter((expense) =>
        Object.values(expense).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Flex justify="space-between" mt="4" alignItems="center" padding="0 4%">
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
            <Input
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mb="4"
            />
            {filteredExpenseData.length > 0 ? (
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
                  {filteredExpenseData.map((expense, index) => (
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
            ) : (
              <Text>No matching expenses found</Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseReportModal;
