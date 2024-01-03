// store.js
import { configureStore } from '@reduxjs/toolkit';
import goalReducer from './reducers/goalReducer'; // Create this reducer in the next step
import expenseReducer from './reducers/expenseReducer';
import portfolioReducer from './reducers/portfolioReducer';

const store = configureStore({
  reducer: {
    goals: goalReducer,
    expenses: expenseReducer,
    portfolios: portfolioReducer
  },
});

export default store;
