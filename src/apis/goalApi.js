// api/goalApi.js

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const fetchGoalsAPI = async () => {
  try {
    // Retrieve token from cookies
    const token = cookies.get('token');
    // Make a GET request to fetch goals
    const response = await axios.get('https://track-us.vercel.app/user/goals', {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.goal;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching goals:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

export const createGoalsAPI = async (newGoal) => {
  try {
    
    const token = cookies.get('token');
    // Make a POST request to Create goals
    const response = await axios.post('https://track-us.vercel.app/user/goals',newGoal, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.goal;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching goals:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

export const deleteGoalsAPI = async (id) => {
  try {
    const token = cookies.get('token');
    console.log(id)
    // Make a POST request to Create goals
    const response = await axios.delete(`https://track-us.vercel.app/user/goals/${id}`,{
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return id;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching goals:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

export const updateGoalsAPI = async (updatedGoal) => {
  try {
    const token = cookies.get('token');
    const response = await axios.patch(`https://track-us.vercel.app/user/goals/${updatedGoal._id}`, {
      ...updatedGoal
    }, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.goal;
  } catch (error) {
    console.error('Error updating goals:', error);
    throw error;
  }
};




