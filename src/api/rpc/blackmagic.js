import Shirow from "shirow";
import { getAccessToken } from "utils/token";
import { blackmagicUrl } from "../../../config/main"; // TODO: resolve path to config

const INIT_NEW_IMAGE_RP = "init_new_image";
const INIT_EXISTING_IMAGE_RP = "init_existing_image";
const IS_IMAGE_AVAILABLE_FOR_RECOVERY_RP = "is_image_available_for_recovery";
const GET_BASE_PACKAGES_LIST_RP = "get_base_packages_list";
const GET_PACKAGES_LIST_RP = "get_packages_list";
const GET_SELECTED_PACKAGES_LIST_RP = "get_selected_packages_list";
const GET_PACKAGES_NUMBER_RP = "get_packages_number";
const GET_BASE_PACKAGES_NUMBER_RP = "get_base_packages_number";
const GET_SELECTED_PACKAGES_NUMBER_RP = "get_selected_packages_number";
const RESOLVE_PACKAGES_RP = "resolve";
const GET_CONFIGURATION_RP = "get_configuration";
const SET_CONFIGURATION_RP = "set_configuration";
const GET_USERS_LIST_RP = "get_users_list";
const GET_DEFAULT_ROOT_PASSWORD_RP = "get_default_root_password";
const CHANGE_ROOT_PASSWORD_RP = "change_root_password";
const GET_SHELLS_LIST_RP = "get_shells_list";
const ADD_USER_RP = "add_user";
const BUILD_IMAGE_RP = "build";

export default class Blackmagic {
    constructor() {
        if (!Blackmagic.prototype.connection) {
            const token = getAccessToken();
            Blackmagic.prototype.connection = new Shirow(blackmagicUrl.replace("%token", token));
        }

        this.fetchPackagesList = this.fetchPackagesList.bind(this);
        this.fetchBasePackagesList = this.fetchBasePackagesList.bind(this);
        this.fetchSelectedPackagesList = this.fetchSelectedPackagesList.bind(this);
        this.fetchPackagesNumber = this.fetchPackagesNumber.bind(this);
        this.fetchBasePackagesNumber = this.fetchBasePackagesNumber.bind(this);
        this.fetchSelectedPackagesNumber = this.fetchSelectedPackagesNumber.bind(this);
        this.fetchConfiguration = this.fetchConfiguration.bind(this);
        this.isImageAvailableForRecovery = this.isImageAvailableForRecovery.bind(this);
    }

    async initNewImage(device, distro, buildType) {
        return this.connection.emit(INIT_NEW_IMAGE_RP, device, distro, buildType);
    }

    async initExistingImage(buildUUID) {
        return this.connection.emit(INIT_EXISTING_IMAGE_RP, buildUUID);
    }

    isImageAvailableForRecovery(imageId) {
        return this.connection.emit(IS_IMAGE_AVAILABLE_FOR_RECOVERY_RP, imageId);
    }

    async fetchBasePackagesList(currentPage, packagesPerPage) {
        return this.connection.emitForce(GET_BASE_PACKAGES_LIST_RP, currentPage, packagesPerPage);
    }

    async fetchPackagesList(currentPage, packagesPerPage, searchToken = null) {
        return this.connection.emitForce(
            GET_PACKAGES_LIST_RP, currentPage, packagesPerPage, searchToken,
        );
    }

    async fetchSelectedPackagesList(currentPage, packagesPerPage) {
        return this.connection.emitForce(
            GET_SELECTED_PACKAGES_LIST_RP, currentPage, packagesPerPage,
        );
    }

    async fetchPackagesNumber(searchToken = null) {
        return this.connection.emit(GET_PACKAGES_NUMBER_RP, searchToken);
    }

    async fetchBasePackagesNumber() {
        return this.connection.emit(GET_BASE_PACKAGES_NUMBER_RP);
    }

    async fetchSelectedPackagesNumber() {
        return this.connection.emitForce(GET_SELECTED_PACKAGES_NUMBER_RP);
    }

    async resolvePackages(packageList) {
        return this.connection.emitForce(RESOLVE_PACKAGES_RP, packageList);
    }

    async fetchConfiguration() {
        return this.connection.emitForce(GET_CONFIGURATION_RP);
    }

    async setConfiguration(configuration) {
        return this.connection.emit(SET_CONFIGURATION_RP, configuration);
    }

    async fetchUsersList() {
        return this.connection.emitForce(GET_USERS_LIST_RP);
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
