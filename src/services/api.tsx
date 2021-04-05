import { Platform } from 'react-native';
import axios from 'axios';

const url =
  Platform.OS === 'ios' ? 'http://localhost:3333' : 'http://10.0.2.2:3333';

const api = axios.create({
  baseURL: url,
});

console.log(url);

export default api;
