import axios from 'axios';

const APIUrl = axios.create({
  baseURL: process.env.API_URL,
});

export default APIUrl;
