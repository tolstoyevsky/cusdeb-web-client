import axios from "axios";
import { cusdebTZURL } from "config/main";

export const fetchTZData = async () => (
    axios.get(`${cusdebTZURL}/list_time_zones`)
);
