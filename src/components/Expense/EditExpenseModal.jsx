import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
} from "@chakra-ui/react";

const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    setEditedExpense({ ...expense });
  }, [expense]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format the date value if the input is for the date field
    const formattedValue =
      name === "date" ? new Date(value).toISOString().split("T")[0] : value;

    setEditedExpense((prevExpense) => ({
      ...prevExpense,
      [name]: formattedValue,
    }));
  };

  const handleSaveChanges = () => {
    onSave({ ...editedExpense });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={editedExpense.description || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={editedExpense.amount || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={editedExpense.category || ""}
                onChange={handleInputChange}
              >
                <option value="invest">Invest</option>
                <option value="spend">Spend</option>
                <option value="lend">Lend</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={editedExpense.status || ""}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={
                  editedExpense.date
                    ? new Date(editedExpense.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </FormControl>
            {/* Add other form fields based on your expense object */}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditExpenseModal;
