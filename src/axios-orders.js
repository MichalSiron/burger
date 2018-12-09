import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4610e.firebaseio.com/'
});

export default instance;