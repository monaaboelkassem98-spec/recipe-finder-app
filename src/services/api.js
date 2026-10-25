import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/recipes';

export const getAllRecipes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const searchRecipes = async (query) => {
  const response = await axios.get(`${BASE_URL}/search?q=${query}`);
  return response.data;
};

export const getSingleRecipe = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getAllTags = async () => {
  const response = await axios.get(`${BASE_URL}/tags`);
  return response.data;
};

export const getRecipesByTag = async (tag) => {
  const response = await axios.get(`${BASE_URL}/tag/${tag}`);
  return response.data;
};