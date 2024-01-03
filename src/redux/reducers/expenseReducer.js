import { createSlice } from '@reduxjs/toolkit';
import { createExpense, deleteExpense, fetchExpense, updatedExpense } from '../thunks/expenseThunks';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        data: [],
        status: 'idle',
        error: 'null'
    },
    reducers:{

    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchExpense.pending,(state) => {
            state.status = 'loading';
          })
          .addCase(fetchExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(createExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Add the newly created expense to the data array
            const createdExpense = action.payload;
            state.data.push(createdExpense);
          })
          .addCase(createExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(updatedExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Update the existing goal in the data array
            const updatedExpense = action.payload;
            state.data = state.data.map((expense) =>
              expense._id === updatedExpense._id ? updatedExpense : expense
            );
          })
          .addCase(updatedExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(deleteExpense.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Remove the deleted expense from the data array
            const deletedExpenseId = action.payload;
            state.data = state.data.filter((goal) => goal._id !== deletedExpenseId);
          })
          .addCase(deleteExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    }
})

export default expenseSlice.reducer;