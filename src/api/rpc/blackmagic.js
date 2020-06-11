import Shirow from "shirow";
import { blackmagicRpcURL } from "config/main";

const INIT_RP = "init";
const GET_BASE_PACKAGES_LIST_RP = "get_base_packages_list";
const GET_PACKAGES_LIST_RP = "get_packages_list";
const GET_SELECTED_PACKAGES_LIST_RP = "get_selected_packages_list";
const GET_PACKAGES_NUMBER_RP = "get_packages_number";
const GET_BASE_PACKAGES_NUMBER_RP = "get_base_packages_number";
const GET_SELECTED_PACKAGES_NUMBER_RP = "get_selected_packages_number";
const SEARCH_PACKAGES_RP = "search";
const RESOLVE_PACKAGES_RP = "resolve";
const GET_DEFAULT_CONFIGURATION_RP = "get_default_configuration";
const SYNC_CONFIGURATION_RP = "sync_configuration";
const GET_USERS_LIST_RP = "get_users_list";
const GET_DEFAULT_ROOT_PASSWORD_RP = "get_default_root_password";
const CHANGE_ROOT_PASSWORD_RP = "change_root_password";
const GET_SHELLS_LIST_RP = "get_shells_list";
const ADD_USER_RP = "add_user";
const BUILD_IMAGE_RP = "build";

export default class Blackmagic {
    constructor() {
        if (!Blackmagic.prototype.connection) {
            const token = localStorage.getItem("accessToken");
            Blackmagic.prototype.connection = new Shirow(blackmagicRpcURL.replace("%token", token));
        }

        this.fetchPackagesList = this.fetchPackagesList.bind(this);
        this.fetchBasePackagesList = this.fetchBasePackagesList.bind(this);
        this.fetchSelectedPackagesList = this.fetchSelectedPackagesList.bind(this);
        this.fetchPackagesNumber = this.fetchPackagesNumber.bind(this);
        this.fetchBasePackagesNumber = this.fetchBasePackagesNumber.bind(this);
        this.fetchSelectedPackagesNumber = this.fetchSelectedPackagesNumber.bind(this);
    }

    async initialization(firmwareName, device, OS, buildType, callback) {
        return this.connection.emit(INIT_RP, firmwareName, device, OS, buildType)
            .then((event) => {
                callback(event);
            });
    }

    async fetchBasePackagesList(currentPage, packagesPerPage) {
        return this.connection.emitForce(GET_BASE_PACKAGES_LIST_RP, currentPage, packagesPerPage);
    }

    async fetchPackagesList(currentPage, packagesPerPage) {
        return this.connection.emitForce(GET_PACKAGES_LIST_RP, currentPage, packagesPerPage);
    }

    async fetchSelectedPackagesList(currentPage, packagesPerPage) {
        return this.connection.emitForce(
            GET_SELECTED_PACKAGES_LIST_RP, currentPage, packagesPerPage,
        );
    }

    async fetchPackagesNumber() {
        return this.connection.emit(GET_PACKAGES_NUMBER_RP);
    }

    async fetchBasePackagesNumber() {
        return this.connection.emit(GET_BASE_PACKAGES_NUMBER_RP);
    }

    async fetchSelectedPackagesNumber() {
        return this.connection.emit(GET_SELECTED_PACKAGES_NUMBER_RP);
    }

    async searchPackagesp(packageName) {
        return this.connection.emit(SEARCH_PACKAGES_RP, packageName);
    }

    async resolvePackages(packageList) {
        return this.connection.emitForce(RESOLVE_PACKAGES_RP, packageList);
    }

    async fetchDefaultConfigurationParams() {
        return this.connection.emit(GET_DEFAULT_CONFIGURATION_RP);
    }

    async syncConfigurationParams(configuration) {
        return this.connection.emit(SYNC_CONFIGURATION_RP, configuration);
    }

    async fetchUsersList() {
        return this.connection.emit(GET_USERS_LIST_RP);
    }

    async fetchDefaultRootPassword() {
        return this.connection.emit(GET_DEFAULT_ROOT_PASSWORD_RP);
    }

    async changeRootPassword(rootPassword) {
        return this.connection.emit(CHANGE_ROOT_PASSWORD_RP, rootPassword);
    }

    async fetchShellsList() {
        return this.connection.emit(GET_SHELLS_LIST_RP);
    }

    async addUser(user) {
        return this.connection.emit(ADD_USER_RP, ...user);
    }

    async buildImage() {
        return this.connection.emit(BUILD_IMAGE_RP);
    }
}
