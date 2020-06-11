import Shirow from "shirow";
import { dominionRpcURL } from "config/main";

const GET_RT_BUILD_LOG_RP = "get_rt_build_log";

export default class Dominion {
    constructor() {
        if (!Dominion.prototype.connection) {
            const token = localStorage.getItem("accessToken");
            Dominion.prototype.connection = new Shirow(dominionRpcURL.replace("%token", token));
        }
    }

    async getRtBuildLog(buildUUID, callback) {
        this.connection.emitForce(GET_RT_BUILD_LOG_RP, buildUUID).then(callback);
    }
}
