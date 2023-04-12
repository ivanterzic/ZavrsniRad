import axios from 'axios';

let backend = axios.create({
  baseURL: `http://localhost:5300/`
});

export default backend;