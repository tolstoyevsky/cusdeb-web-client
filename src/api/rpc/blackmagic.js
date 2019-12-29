import getRpcClient from "utils/rpc-client";

const INIT_RP = "init";

let _rpcClient;

export const connectToRpc = async () => {
    _rpcClient = await getRpcClient(BM_RPC_ADDR);
}

export const initialization = async (firmwareName, device, OS, buildType, callback) => (
    await _rpcClient.emit(INIT_RP,
        firmwareName,
        device,
        OS,
        buildType,
    ).then(event => {
        callback(event);
    })
)
