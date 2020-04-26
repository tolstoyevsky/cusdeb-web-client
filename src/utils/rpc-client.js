import Shirow from "shirow";
import { getToken } from "utils/localStorage";

export default class RpcClient {
    constructor(rpcURL) {
        if (!RpcClient.connection) {
            const token = getToken("accessToken");
            RpcClient.connection = new Shirow(rpcURL.replace("%token", token));
        }
        this.connection = RpcClient.connection;
    }
}
