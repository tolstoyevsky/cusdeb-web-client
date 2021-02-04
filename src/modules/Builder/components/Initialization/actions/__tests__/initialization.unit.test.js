import {
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDeviceShortName,
    setDeviceList,
    setDistroShortName,
    setDistroList, toggleContinueBuildModal,
} from "../initialization";
import {
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE_SHORT_NAME,
    SET_DEVICE_LIST,
    SET_DISTRO_SHORT_NAME,
    SET_DISTRO_LIST, TOGGLE_CONTINUE_BUILD_MODAL,
} from "../../constants/initialization";

describe("Initialization actions", () => {
    it("setBuildType", () => {
        const buildType = "Classic image";
        const expectedAction = {
            type: SET_BUILD_TYPE,
            payload: buildType,
        };
        expect(setBuildType(buildType)).toEqual(expectedAction);
    });

    it("setBuildTypeList", () => {
        const buildTypeList = ["Classic image"];
        const expectedAction = {
            type: SET_BUILD_TYPE_LIST,
            payload: buildTypeList,
        };
        expect(setBuildTypeList(buildTypeList)).toEqual(expectedAction);
    });

    it("setBuildUUID", () => {
        const buildUUID = "123e4567-e89b-12d3-a456-426614174000";
        const expectedAction = {
            type: SET_BUILD_UUID,
            payload: buildUUID,
        };
        expect(setBuildUUID(buildUUID)).toEqual(expectedAction);
    });

    it("setDeviceShortName", () => {
        const deviceShortName = "opi-pc-plus";
        const expectedAction = {
            type: SET_DEVICE_SHORT_NAME,
            payload: deviceShortName,
        };
        expect(setDeviceShortName(deviceShortName)).toEqual(expectedAction);
    });

    it("setDeviceList", () => {
        const deviceList = {
            "opi-pc-plus": {
                distros: {
                    "debian-buster-armhf": {
                        build_types: ["classic"],
                        codename: "Buster",
                        name: "Debian",
                        packages_url: "https://packages.debian.org/buster/",
                        port: "armhf",
                        version: 10,
                    },
                    "kali-rolling-armhf": {
                        build_types: ["classic"],
                        codename: null,
                        name: "Kali Rolling",
                        packages_url: null,
                        port: "armhf",
                        version: null,
                    },
                },
                generation: null,
                model: "PC Plus",
                name: "Orange Pi",
            },
            "rpi-3-b": {
                distros: {
                    "alpine-3.12-armhf": {
                        build_types: ["classic"],
                        codename: null,
                        name: "Alpine",
                        packages_url: "https://pkgs.alpinelinux.org/package/v3.12/",
                        port: "armhf",
                        version: 3.12,
                    },
                    "raspbian-buster-armhf": {
                        build_types: ["classic", "mender", "artifact"],
                        codename: "Buster",
                        name: "Raspbian",
                        packages_url: null,
                        port: "armhf",
                        version: 10,
                    },
                },
                generation: 3,
                model: "Model B",
                name: "Raspberry Pi",
            },
        };

        const expectedAction = {
            type: SET_DEVICE_LIST,
            payload: deviceList,
        };
        expect(setDeviceList(deviceList)).toEqual(expectedAction);
    });

    it("setDistroShortName", () => {
        const distroShortName = "debian-buster-armhfs";
        const expectedAction = {
            type: SET_DISTRO_SHORT_NAME,
            payload: distroShortName,
        };
        expect(setDistroShortName(distroShortName)).toEqual(expectedAction);
    });

    it("setDistroList", () => {
        const distroList = {
            "alpine-3.12-armhf": {
                build_types: ["classic"],
                codename: null,
                name: "Alpine",
                packages_url: "https://pkgs.alpinelinux.org/package/v3.12/",
                port: "armhf",
                version: 3.12,
            },
            "raspbian-buster-armhf": {
                build_types: ["classic", "mender", "artifact"],
                codename: "Buster",
                name: "Raspbian",
                packages_url: null,
                port: "armhf",
                version: 10,
            },
        };

        const expectedAction = {
            type: SET_DISTRO_LIST,
            payload: distroList,
        };
        expect(setDistroList(distroList)).toEqual(expectedAction);
    });

    it("toggleContinueBuildModal", () => {
        const expectedAction = {
            type: TOGGLE_CONTINUE_BUILD_MODAL,
        };
        expect(toggleContinueBuildModal()).toEqual(expectedAction);
    });
});
