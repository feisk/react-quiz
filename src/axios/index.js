import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-f8e83.firebaseio.com/'
});