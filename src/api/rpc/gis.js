import Shirow from "shirow";
import { getAccessToken } from "utils/token";
import { gisUrl } from "../../../config/main"; // TODO: resolve path to config

const INIT_NEW_KERNEL_CONFIGURATION = "init_new_kernel_configuration";
const START_KERNEL_CONFIGURATION_RP = "start";
const ENTER_DATA_RP = "enter";
const GET_CONFIGURATOR_THEMES_RP = "get_configurator_themes";
const SET_CONFIGURATOR_THEME_RP = "set_configurator_theme";

export default class GiS {
    constructor() {
        if (!GiS.prototype.connection) {
            const token = getAccessToken();
            GiS.prototype.connection = new Shirow(gisUrl.replace("%token", token));
        }

        this.fetchKernelConfiguratorThemes = this.fetchKernelConfiguratorThemes.bind(this);
        this.setKernelConfiguratorTheme = this.setKernelConfiguratorTheme.bind(this);
    }

    async initNewKernelConfiguration(imageId) {
        return this.connection.emit(INIT_NEW_KERNEL_CONFIGURATION, imageId);
    }

    async fetchKernelConfiguratorThemes() {
        return this.connection.emit(GET_CONFIGURATOR_THEMES_RP);
    }

    async enter(data) {
        this.connection.emitForce(ENTER_DATA_RP, data);
    }

    async setKernelConfiguratorTheme(theme) {
        this.connection.emitForce(SET_CONFIGURATOR_THEME_RP, theme);
    }

    async start(callback) {
        this.connection.emitForce(START_KERNEL_CONFIGURATION_RP).then(callback);
    }
}
