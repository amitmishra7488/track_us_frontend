import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPortfolioAPI,
  deletePortfolioAPI,
  fetchPortfolioAPI,
} from "../../apis/portfolioApi";

export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async () => {
    const portfolios = await fetchPortfolioAPI();
    return portfolios;
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolio/deletePortfolio",
  async (id) => {
    console.log(id);
    const deletedPortfolioId = await deletePortfolioAPI(id);
    return deletedPortfolioId;
  }
);

export const createPortfolio = createAsyncThunk(
  "portfolio/createPortfolio",
  async (newPortfolio) => {
    console.log(newPortfolio);
    const createdPortfolio = await createPortfolioAPI(newPortfolio);
    return createdPortfolio;
  }
);
