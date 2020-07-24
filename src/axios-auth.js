import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

// axiosInstance.defaults.headers.common['Authentication'] = 'something';

export default axiosInstance;