// goalReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { createGoals, deleteGoals, fetchGoals, updateGoals } from '../thunks/goalThunks';

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add other synchronous actions as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the newly created goal to the data array
        const createdGoal = action.payload;
        state.data.push(createdGoal);
      })
      .addCase(createGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted goal from the data array
        const deletedGoalId = action.payload;
        state.data = state.data.filter((goal) => goal._id !== deletedGoalId);
      })
      .addCase(deleteGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the existing goal in the data array
        const updatedGoal = action.payload;
        state.data = state.data.map((goal) =>
          goal._id === updatedGoal._id ? updatedGoal : goal
        );
      })
      .addCase(updateGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goalSlice.reducer;
