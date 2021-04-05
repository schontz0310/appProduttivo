import { Platform } from 'react-native';
import axios from 'axios';

const url =
  Platform.OS === 'ios' ? 'http://jmsoft.dyndns.info:8050/api' : 'http://jmsoft.dyndns.info:8050/api';

const api = axios.create({
  baseURL: url,
});

console.log(url);

export default api;
