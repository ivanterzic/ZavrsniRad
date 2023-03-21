import axios from 'axios';

let backend = axios.create({
  baseURL: `http://localhost:3001/`
});

export default backend;