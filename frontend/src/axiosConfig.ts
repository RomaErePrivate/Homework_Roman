import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios;