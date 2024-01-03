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
  Textarea,
  Select,
} from "@chakra-ui/react";

const GoalCreationModal = ({ isOpen, onClose, onCreateGoal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleCreateGoal = () => {
    
    const newGoal = {
      title,
      description,
      category,
      deadline,
    };
    onCreateGoal(newGoal);
    // Clear form and close modal
    setTitle("");
    setDescription("");
    setCategory("");
    setDeadline("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Goal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Category</FormLabel>
            {/* You can replace the Select options with your valid categories */}
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="fitness">Fitness</option>
              <option value="study">Study</option>
              <option value="study">Study</option>
              <option value="productive">Productive</option>
              <option value="finance">Finance</option>
              <option value="family">Family</option>
              <option value="others">Others</option>
            </Select>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Deadline</FormLabel>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCreateGoal}>
            Create Goal
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoalCreationModal;
