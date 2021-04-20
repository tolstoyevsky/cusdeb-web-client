import {
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDeviceShortName,
    setDistroShortName,
    setDistroList,
    setLatestBuildImage,
    toggleContinueBuildModal,
} from "../initialization";
import {
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE_SHORT_NAME,
    SET_DISTRO_SHORT_NAME,
    SET_DISTRO_LIST,
    SET_LATEST_BUILD_IMAGE,
    TOGGLE_CONTINUE_BUILD_MODAL,
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

    it("setLatestBuildImage", () => {
        const latestBuildImage = {
            image_id: "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxx",
            device_name: "rpi-3-b-plus",
            distro_name: "ubuntu-bionic-armhf",
            flavour: "Classic",
            started_at: null,
            status: "Undefined",
            notes: "",
        };
        const expectedAction = {
            type: SET_LATEST_BUILD_IMAGE,
            payload: latestBuildImage,
        };
        expect(setLatestBuildImage(latestBuildImage)).toEqual(expectedAction);
    });

    it("toggleContinueBuildModal", () => {
        const expectedAction = {
            type: TOGGLE_CONTINUE_BUILD_MODAL,
        };
        expect(toggleContinueBuildModal()).toEqual(expectedAction);
    });
});
