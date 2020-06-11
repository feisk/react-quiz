import axios from "axios";

const baseURL = process.env.REACT_APP_FIREBASE_URL;

export default axios.create({ baseURL });
