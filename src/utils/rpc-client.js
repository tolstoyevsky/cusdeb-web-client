import Shirow from "shirow";

// TODO: temporary solution. The real tokens will be used when Shirow is done.
const token = "mock_token";

const getRpcClient = (rpcURL) => new Shirow(rpcURL.replace("%token", token));

export default getRpcClient;
