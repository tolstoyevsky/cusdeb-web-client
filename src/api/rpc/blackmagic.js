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
const GET_USERS_LIST_RP = "get_users_list";
const GET_DEFAULT_ROOT_PASSWORD_RP = "get_default_root_password";
const CHANGE_ROOT_PASSWORD_RP = "change_root_password";
const GET_SHELLS_LIST_RP = "get_shells_list";
const ADD_USER_RP = "add_user";

const rpcClient = getRpcClient(blackmagicRpcURL);

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

export const fetchUsersList = async () => (
    rpcClient.emit(GET_USERS_LIST_RP)
);

export const fetchDefaultRootPassword = async () => (
    rpcClient.emit(GET_DEFAULT_ROOT_PASSWORD_RP)
);

export const changeRootPassword = async (rootPassword) => (
    rpcClient.emit(CHANGE_ROOT_PASSWORD_RP, rootPassword)
);

export const fetchShellsList = async () => (
    rpcClient.emit(GET_SHELLS_LIST_RP)
);

export const addUser = async (user) => (
    rpcClient.emit(ADD_USER_RP, ...user)
);
