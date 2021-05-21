import ConfigurationReducer from "../configuration";
import {
    fetchConfigurationParamsSucceeded,
    fetchTimeZonesListSucceeded,
    setFieldStatus,
    updateConfigurationParams,
} from "../../actions/configuration";

describe("Configuration reducer", () => {
    it("Default state", () => {
        expect(ConfigurationReducer(undefined, {}))
            .toEqual({
                fieldStatuses: {},
                configurationParams: {},
                timeZonesList: [],
            });
    });

    it("FETCH_CONFIGURATION_PARAMS_SUCCEEDED", () => {
        const configurationParams = {
            host_name: "cusdeb",
            time_zone: "Etc/UTC",
            enable_wireless: false,
            WPA_SSID: "cusdeb",
            WPA_PSK: "",
        };

        const reducer = ConfigurationReducer({},
            fetchConfigurationParamsSucceeded(configurationParams));
        expect(reducer).toEqual({ configurationParams });
    });

    it("FETCH_TIME_ZONES_LIST_SUCCEEDED", () => {
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

        const reducer = ConfigurationReducer({}, fetchTimeZonesListSucceeded(timeZonesList));
        expect(reducer).toEqual({ timeZonesList });
    });

    it("SET_FIELD_STATUS", () => {
        const fieldStatuses = {
            hostname: false,
            WPA_SSID: true,
            WPA_PSK: true,
        };
        const expectedFieldStatuses = {
            hostname: true,
            WPA_SSID: true,
            WPA_PSK: true,
        };

        const reducer = ConfigurationReducer({ fieldStatuses },
            setFieldStatus({ hostname: true }));
        expect(reducer).toEqual({ fieldStatuses: expectedFieldStatuses });
    });

    it("UPDATE_CONFIGURATION_PARAMS", () => {
        const configurationParams = {
            host_name: "cusdeb",
            time_zone: "Etc/UTC",
            enable_wireless: false,
            WPA_SSID: "cusdeb",
            WPA_PSK: "",
        };
        const expectedConfigurationParams = {
            host_name: "cusdeb1",
            time_zone: "Etc/UTC",
            enable_wireless: false,
            WPA_SSID: "cusdeb",
            WPA_PSK: "",
        };

        const reducer = ConfigurationReducer({ configurationParams },
            updateConfigurationParams({ key: "host_name", value: "cusdeb1" }));
        expect(reducer).toEqual({ configurationParams: expectedConfigurationParams });
    });
});
