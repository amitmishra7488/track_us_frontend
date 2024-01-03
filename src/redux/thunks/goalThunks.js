// goalThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createGoalsAPI, deleteGoalsAPI, fetchGoalsAPI, updateGoalsAPI } from '../../apis/goalApi';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
    const goals = await fetchGoalsAPI();
    return goals;
  });

export const createGoals = createAsyncThunk('goals/createGoal', async (newGoal) => {
  console.log(newGoal);
  const createdGoal = await createGoalsAPI(newGoal);
  return createdGoal;
});

export const deleteGoals = createAsyncThunk('goals/deleteGoal', async (id) => {
  console.log(id);
  const deletedGoalId = await deleteGoalsAPI(id);
  return deletedGoalId;
});

export const updateGoals = createAsyncThunk('goals/updateGoal', async (updatedGoals) => {
  console.log(updatedGoals);
  const updatedGoal = await updateGoalsAPI(updatedGoals);
  return updatedGoal;
});
