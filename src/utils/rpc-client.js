import Shirow from "shirow";
import { getToken } from "utils/localStorage";

const getRpcClient = (rpcURL) => {
    const token = getToken("accessToken");
    return new Shirow(rpcURL.replace("%token", token));
};

export default getRpcClient;
