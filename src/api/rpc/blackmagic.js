import getRpcClient from "utils/rpc-client";
import { blackmagicRpcURL } from "config/main";

const INIT_RP = "init";
const GET_BASE_PACKAGES_LIST_RP = "get_base_packages_list";
const GET_PACKAGES_LIST_RP = "get_packages_list";
const GET_PACKAGES_NUMBER_RP = "get_packages_number";
const SEARCH_PACKAGES_RP = "search";
const RESOLVE_PACKAGES_RP = "resolve";
const GET_DEFAULT_CONFIGURATION_RP = "get_default_configuration";
const SYNC_CONFIGURATION_RP = "sync_configuration";

let rpcClient;

export const connectToRpc = async () => {
    rpcClient = await getRpcClient(blackmagicRpcURL);
};

export const initialization = async (firmwareName, device, OS, buildType, callback) => (
    rpcClient.emit(INIT_RP, firmwareName, device, OS, buildType)
        .then((event) => {
            callback(event);
        })
);

export const fetchBasePackagesList = async () => (
    rpcClient.emit(GET_BASE_PACKAGES_LIST_RP)
);

export const fetchPackagesList = async (currentPage, packagesPerPage) => (
    rpcClient.emit(GET_PACKAGES_LIST_RP, currentPage, packagesPerPage)
);

export const fetchPackagesNumber = async () => (
    rpcClient.emit(GET_PACKAGES_NUMBER_RP)
);

export const searchPackages = async (packageName) => (
    rpcClient.emit(SEARCH_PACKAGES_RP, packageName)
);

export const resolvePackages = async (packageList) => (
    rpcClient.emit(RESOLVE_PACKAGES_RP, packageList)
);

export const fetchDefaultConfigurationParams = async () => (
    rpcClient.emit(GET_DEFAULT_CONFIGURATION_RP)
);

export const syncConfigurationParams = async (configuration) => (
    rpcClient.emit(SYNC_CONFIGURATION_RP, configuration)
);
