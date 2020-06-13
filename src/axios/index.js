import axios from "axios";

const FIREBASE_UR = process.env.REACT_APP_FIREBASE_URL;

export default axios.create({ baseURL: FIREBASE_UR });
