

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
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

const EditGoalModal = ({ isOpen, onClose, goal, onSave }) => {
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };
  console.log(goal)

  const handleSliderChange = (name, value) => {
    setEditedGoal((prevGoal) => ({ ...prevGoal, [name]: value }));
  };

  const handleSaveChanges = () => {
    onSave({ ...editedGoal});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Goal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={editedGoal.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={editedGoal.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Progress</FormLabel>
              <Slider
                name="progress"
                value={editedGoal.progress}
                onChange={(value) => handleSliderChange("progress", value)}
                max={100}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  boxSize={10}
                  color="black"
                >{`${editedGoal.progress}%`}</SliderThumb>
              </Slider>
              <Text ml={4}>{`${editedGoal.progress}%`}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={editedGoal.category}
                onChange={handleInputChange}
              >
                <option value="fitness">Fitness</option>
                {/* Add other category options as needed */}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                name="deadline"
                value={editedGoal.deadline}
                onChange={handleInputChange}
              />
            </FormControl>

            {/* Add other form fields based on your goal object */}
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

export default EditGoalModal;
