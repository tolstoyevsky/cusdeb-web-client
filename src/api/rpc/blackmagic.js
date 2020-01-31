import getRpcClient from "utils/rpc-client";

const INIT_RP = "init";
const GET_BASE_PACKAGES_LIST_PR = "get_base_packages_list";
const GET_PACKAGES_LIST_PR = "get_packages_list";
const GET_PACKAGES_NUMBER_PR = "get_packages_number";
const SEARCH_PACKAGES_PR = "search";
const RESOLVE_PACKAGES_PR = "resolve";

let rpcClient;

export const connectToRpc = async () => {
    /* global BM_RPC_ADDR */
    rpcClient = await getRpcClient(BM_RPC_ADDR);
};

export const initialization = async (firmwareName, device, OS, buildType, callback) => (
    rpcClient.emit(INIT_RP, firmwareName, device, OS, buildType)
        .then((event) => {
            callback(event);
        })
);

export const fetchBasePackagesList = async () => (
    rpcClient.emit(GET_BASE_PACKAGES_LIST_PR)
);

export const fetchPackagesList = async (currentPage, packagesPerPage) => (
    rpcClient.emit(GET_PACKAGES_LIST_PR, currentPage, packagesPerPage)
);

export const fetchPackagesNumber = async () => (
    rpcClient.emit(GET_PACKAGES_NUMBER_PR)
);

export const searchPackages = async (packageName) => (
    rpcClient.emit(SEARCH_PACKAGES_PR, packageName)
);

export const resolvePackages = async (packageList) => (
    rpcClient.emit(RESOLVE_PACKAGES_PR, packageList)
);
