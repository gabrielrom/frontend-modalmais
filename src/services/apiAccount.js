import axios from "axios";

const apiAccount = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

const apiTransfers = axios.create({
  baseURL: 'http://localhost:5002/api/v1',
});

export { apiAccount, apiTransfers } ;

