import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const fetchPortfolioAPI = async () => {
  try {
    
    const token = cookies.get('token');
    const response = await axios.get('https://track-us.vercel.app/user/portfolio', {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.portfolio;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching portfolio:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

export const deletePortfolioAPI = async (id) => {
  try {
    const token = cookies.get('token');
    console.log(id)
    // Make a POST request to Create portfolio
    const response = await axios.delete(`https://track-us.vercel.app/user/portfolio/${id}`,{
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
    return id;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching portfolio:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

export const createPortfolioAPI = async (newPortfolio) => {
  try {
    
    const token = cookies.get('token');
    // Make a POST request to Create portfolio
    const response = await axios.post('https://track-us.vercel.app/user/portfolio',newPortfolio, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data.portfolio;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching portfolio:', error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};