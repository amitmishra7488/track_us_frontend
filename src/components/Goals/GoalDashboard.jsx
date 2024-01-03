import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorMode,
  TableContainer,
  Text,
  Progress,
} from "@chakra-ui/react";
import { FaPlus, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import GoalCreationModal from "./GoalCreationModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createGoals,
  deleteGoals,
  fetchGoals,
} from "../../redux/thunks/goalThunks";
import AlertDialogue from "../Common/AlertDialogue";

const GoalDashboard = () => {
  const { colorMode } = useColorMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.data);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  // Create Logic
  const handleCreateGoal = (newGoal) => {
    dispatch(createGoals(newGoal));
  };

  // Delete logic
  const handleDelete = (id) => {
    setGoalToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteGoals(goalToDelete));
    setIsDeleteAlertOpen(false);
  };

  const handleCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };

  const handleView = (goalId) => {
    // Use the navigate function to go to the single goal page
    navigate(`/goal/${goalId}`);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Add a check for undefined goals
  const currentItems = goals ? goals.slice(indexOfFirstItem, indexOfLastItem) : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Flex p="4" flexDirection="column">
      {/* Create Goal Button */}
      <Box mb="4" textAlign="right">
        <Button
          colorScheme="teal"
          leftIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Goal
        </Button>
        <GoalCreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateGoal={handleCreateGoal}
        />
      </Box>

      {/* List of Goals (Table) */}
      {currentItems && Array.isArray(currentItems) && currentItems.length > 0 ? (
        <TableContainer
          maxH="70vh"
          overflowY="auto"
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
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Deadline</Th>
                <Th>Progress</Th>
                <Th>Completed</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((goal, index) => (
                <Tr
                  key={index}
                  _hover={{
                    backgroundColor:
                      colorMode === "light" ? "teal.100" : "teal.700",
                  }}
                >
                  <Td>{goal.title}</Td>
                  <Td>{goal.category}</Td>
                  <Td>{goal.deadline}</Td>
                  <Td>
                    <Progress hasStripe value={goal.progress} />
                    {`${goal.progress}%`}
                  </Td>

                  <Td>{goal.completed ? "Yes" : "No"}</Td>
                  <Td>
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      icon={<FaEye />}
                      onClick={()=>handleView(goal._id)}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      icon={<MdDelete />}
                      onClick={() => handleDelete(goal._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>No goals found. Create your goals!</Text>
      )}

      {/* Pagination */}
      <Box mt="4" textAlign="center">
        {Array.from({ length: Math.ceil(goals.length / itemsPerPage) }).map(
          (item, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              colorScheme={currentPage === index + 1 ? "teal" : "gray"}
              onClick={() => paginate(index + 1)}
              mx="1"
            >
              {index + 1}
            </Button>
          )
        )}
      </Box>
      <AlertDialogue
        isOpen={isDeleteAlertOpen}
        onClose={handleCloseDeleteAlert}
        onConfirm={handleConfirmDelete}
        title="Delete Goal"
        message="Are you sure you want to delete this goal?"
      />
    </Flex>
  );
};

export default GoalDashboard;



