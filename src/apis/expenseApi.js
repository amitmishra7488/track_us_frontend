import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const fetchExpenseAPI = async () => {
  try {
    // Retrieve token from cookies
    const token = cookies.get("token");
    // Make a GET request to fetch expense
    const response = await axios.get("https://track-us.vercel.app/user/expense", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.expense;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error; 
  }
};

export const createExpenseApi = async (newExpense) => {
  try {
    const token = cookies.get("token");
    const response = await axios.post(
      "https://track-us.vercel.app/user/expense",
      newExpense,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.data.expense;
  } catch (error) {
    console.error("Error  in Expense Post Api:", error);
    throw error;
  }
};

export const updateExpenseApi = async (updatedExpense) => {
  try {
    console.log(updatedExpense)
    const token = cookies.get("token");
    const response = await axios.patch(
      `https://track-us.vercel.app/user/expense/${updatedExpense._id}`,
      updatedExpense,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error  in Expense Post Api:", error);
    throw error;
  }
};

export const deleteExpenseApi = async (id) => {
  try {
    const token = cookies.get("token");
    const response = await axios.delete(
      `https://track-us.vercel.app/user/expense/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return id;
  } catch (error) {
    console.error("Error  in Expense Post Api:", error);
    throw error;
  }
};
