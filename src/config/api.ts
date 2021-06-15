import axios from 'axios';

const APIUrl = axios.create({
  baseURL: 'http://localhost:8080',
});

export default APIUrl;
