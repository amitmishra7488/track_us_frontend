import { createSlice } from "@reduxjs/toolkit";
import { createPortfolio, deletePortfolio, fetchPortfolio } from "../thunks/portfolioThunks";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Add other synchronous actions as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the newly created portfolio to the data array
        const createdPortfolio = action.payload;
        state.data.push(createdPortfolio);
      })
      .addCase(createPortfolio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted portfolio from the data array
        const deletedPortfolioId = action.payload;
        state.data = state.data.filter((portfolio) => portfolio._id !== deletedPortfolioId);
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default portfolioSlice.reducer;