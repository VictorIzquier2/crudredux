import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:3900'
});

export default clienteAxios;