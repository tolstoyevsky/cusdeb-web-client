import {
    fetchConfigurationParamsSucceeded,
    fetchTimeZonesListSucceeded,
    setFieldStatus,
    updateConfigurationParams,
} from "../configuration";
import {
    FETCH_CONFIGURATION_PARAMS_SUCCEEDED,
    FETCH_TIME_ZONES_LIST_SUCCEEDED,
    SET_FIELD_STATUS,
    UPDATE_CONFIGURATION_PARAMS,
} from "../../constants/configuration";

describe("Configuration actions", () => {
    it("fetchConfigurationParamsSucceeded", () => {
        const configurationParams = {
            host_name: "cusdeb",
            time_zone: "Etc/UTC",
            enable_wireless: false,
            WPA_SSID: "cusdeb",
            WPA_PSK: "",
        };

        const expectedAction = {
            type: FETCH_CONFIGURATION_PARAMS_SUCCEEDED,
            payload: configurationParams,
        };
        expect(fetchConfigurationParamsSucceeded(configurationParams)).toEqual(expectedAction);
    });

    it("fetchTimeZonesListSucceeded", () => {
        const timeZonesList = [
            "Africa/Abidjan",
            "Africa/Accra",
            "Africa/Addis_Ababa",
            "Africa/Algiers",
            "Africa/Asmara",
            "Africa/Asmera",
            "Africa/Bamako",
            "Africa/Bangui",
            "Africa/Banjul",
            "Africa/Bissau",
            "Africa/Blantyre",
        ];

        const expectedAction = {
            type: FETCH_TIME_ZONES_LIST_SUCCEEDED,
            payload: timeZonesList,
        };
        expect(fetchTimeZonesListSucceeded(timeZonesList)).toEqual(expectedAction);
    });

    it("setFieldStatus", () => {
        const fieldStatus = { host_name: true };

        const expectedAction = {
            type: SET_FIELD_STATUS,
            payload: fieldStatus,
        };
        expect(setFieldStatus(fieldStatus)).toEqual(expectedAction);
    });

    it("updateConfigurationParams", () => {
        const configurationParams = { host_name: "cusdeb1" };

        const expectedAction = {
            type: UPDATE_CONFIGURATION_PARAMS,
            payload: configurationParams,
        };
        expect(updateConfigurationParams(configurationParams)).toEqual(expectedAction);
    });
});
