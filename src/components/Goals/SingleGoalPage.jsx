import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Box,
  Flex,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { FaEdit } from 'react-icons/fa'
import Graph from "../Graphs/Graph";
import EditGoalModal from "./EditGoalModal";
import { updateGoals } from "../../redux/thunks/goalThunks";
import { useDispatch } from "react-redux";

const SingleGoalPage = () => {
  const { goalId } = useParams();
  const { colorMode } = useColorMode();
  const [goal, setGoal] = useState(null);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const fetchGoalDetails = async () => {
    try {
      const token = cookies.get("token");
      const response = await axios.get(
        `https://track-us.vercel.app/user/goals/${goalId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setGoal(response.data.goal);
    } catch (error) {
      console.error("Error fetching goal details:", error);
    }
  };

  useEffect(() => {
    fetchGoalDetails();
  }, [goalId]);

  const calculateRemainingTime = () => {
    const creationDate = new Date(goal.createdAt);
    const currentDate = new Date();

    const timeDifference = currentDate - creationDate;
    const daysFromCreation = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const deadlineDate = new Date(goal.deadline);
    const remainingDays = Math.floor(
      (deadlineDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    const remainingMonths = Math.floor(remainingDays / 30);
    const daysLeft = remainingDays % 30;

    // console.log("Days from Creation:", daysFromCreation);
    // console.log("Remaining Months:", remainingMonths);
    // console.log("Days Left:", daysLeft);

    return { remainingMonths, daysLeft, daysFromCreation };
  };

  const { remainingMonths, daysLeft, daysFromCreation } = goal
    ? calculateRemainingTime()
    : { remainingMonths: 0, daysLeft: 0, daysFromCreation: 0 };

  const getColorForProgress = (progress) => {
    if (progress < 50) {
      return "red.500";
    } else if (progress < 80) {
      return "yellow.500";
    } else {
      return "teal.500";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async (editedGoal) => {
    try {
      console.log("Saving changes:", editedGoal);
      await dispatch(updateGoals(editedGoal));
      await fetchGoalDetails();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Box p="4">
      {goal ? (
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4}>
          <Box
            width={{ base: "100%", md: "60%" }}
            pr={{ md: 4 }}
            border="1px solid teal"
            p="4"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading mb="4" textShadow="2px 2px 4px teal">
              {goal.title}
            </Heading>
            <FieldValuePair field="Deadline" value={goal.deadline} />
            <FieldValuePair field="Description" value={goal.description} />
            <FieldValuePair
              field="Category"
              value={goal.category.toUpperCase()}
            />
            <FieldValuePair
              field="Created Date"
              value={new Date(goal.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <FieldValuePair
              field="Completed"
              value={goal.completed ? "YES" : "NO"}
            />
            <Flex justifyContent="flex-end" >
              <Button onClick={openModal} colorScheme="teal" variant="outline" leftIcon={<FaEdit/>}>
                Edit Goal
              </Button>
            </Flex>
          </Box>

          <Box width={{ base: "100%", md: "40%" }}>
            <Flex direction="column" align="center">
              <CircularProgress
                value={goal.progress}
                size="120px"
                thickness="12px"
                color={getColorForProgress(goal.progress)}
              >
                <CircularProgressLabel>{`${goal.progress}%`}</CircularProgressLabel>
              </CircularProgress>

              <Box mt="4">
                <Text fontWeight="bold" fontSize="lg">
                  Time Left to Complete:
                </Text>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color="red.500"
                  css={{
                    animation: "blinkingText 1.5s infinite",
                    "@keyframes blinkingText": {
                      "0%": { opacity: 1 },
                      "50%": { opacity: 0 },
                      "100%": { opacity: 1 },
                    },
                  }}
                >
                  {remainingMonths} months and {daysLeft} days
                </Text>
              </Box>
              {goal && (
                <>
                  <Graph goal={goal} />
                </>
              )}
            </Flex>

            {isModalOpen && (
              <EditGoalModal
                isOpen={isModalOpen}
                onClose={closeModal}
                goal={goal} // Pass your goal object here
                onSave={handleSaveChanges}
              />
            )}
          </Box>
        </Flex>
      ) : (
        <Text>Loading goal details...</Text>
      )}
    </Box>
  );
};

const FieldValuePair = ({ field, value }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      marginBottom="2"
      justifyContent="space-between"
      paddingY="2"
    >
      <Text
        flex="2"
        fontWeight="bold"
        fontSize="lg"
        color={colorMode === "light" ? "teal.500" : "teal.300"}
        textTransform="capitalize"
      >
        {field}
      </Text>
      <Text
        flex="1"
        paddingRight="2"
        fontSize="lg"
        color={colorMode === "light" ? "gray.500" : "gray.400"}
      >
        :
      </Text>
      <Text
        flex="3"
        fontSize="lg"
        color={colorMode === "light" ? "gray.700" : "gray.200"}
        textShadow="1px 1px 1px rgba(0, 0, 0, 0.2)"
      >
        {value}
      </Text>
    </Flex>
  );
};

export default SingleGoalPage;
