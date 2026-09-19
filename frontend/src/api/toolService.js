import API from './axios';

export const searchTools = async (query) => {
  const endpoint = query && query.trim() !== '' 
    ? `/tools/search?query=${encodeURIComponent(query.trim())}`
    : '/tools';
  const response = await API.get(endpoint);
  return response.data;
};

export const getToolsByCategory = async (category) => {
  const response = await API.get(`/tools/category/${encodeURIComponent(category)}`);
  return response.data;
};