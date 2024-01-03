import React, { useState } from "react";
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
  Select,
} from "@chakra-ui/react";

const PortfolioCreationModal = ({ isOpen, onClose, onCreatePortfolio }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("bank");
  const [investedAmount, setInvestedAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");

  const handleCreatePortfolio = () => {
    const newPortfolio = {
      name,
      category,
      investedAmount,
      investmentDate,
    };
    onCreatePortfolio(newPortfolio);

    // Clear form and close modal
    setName("");
    setCategory("bank");
    setInvestedAmount("");
    setInvestmentDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Portfolio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Category</FormLabel>
            <Select value={category} isDisabled>
              <option value="bank">Bank</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Invested Amount</FormLabel>
            <Input
              type="number"
              value={investedAmount}
              onChange={(e) => setInvestedAmount(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Investment Date</FormLabel>
            <Input
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCreatePortfolio}>
            Create Portfolio
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PortfolioCreationModal;
