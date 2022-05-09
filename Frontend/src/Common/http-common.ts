import axios from "axios";
import { REACT_APP_SERVER_URL } from "./constants";

export default axios.create({
    baseURL: REACT_APP_SERVER_URL,
    headers: {
        "Content-type": "application/json",
    }
});