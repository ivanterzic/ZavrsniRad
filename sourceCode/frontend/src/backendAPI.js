import axios from 'axios';

let backend = axios.create({
  //baseURL: `http://161.53.18.56:5300/`
  baseURL: `http://localhost:5300/`
});

export default backend;