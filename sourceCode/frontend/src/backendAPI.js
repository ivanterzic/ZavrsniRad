import axios from 'axios';

let backend = axios.create({
  //http://161.53.18.56:4300/
  baseURL: `http://localhost:5300/`
});

export default backend;