import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createExpenseApi,
  deleteExpenseApi,
  fetchExpenseAPI,
  updateExpenseApi,
} from "../../apis/expenseApi";

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async () => {
    const expenses = await fetchExpenseAPI();
    return expenses;
  }
);

export const createExpense = createAsyncThunk(
  "expense/create",
  async (newExpense) => {
    const expense = await createExpenseApi(newExpense);
    return expense;
  }
);

export const updatedExpense = createAsyncThunk(
  "expense/update",
  async (updatedExpense) => {
    const updatedExpensedata = await updateExpenseApi(updatedExpense);
    return updatedExpensedata;
  }
);

export const deleteExpense = createAsyncThunk("expense/deleteExpense", async (id) => {
  console.log(id);
  const deleteExpenseId = await deleteExpenseApi(id);
  return deleteExpenseId;
});
