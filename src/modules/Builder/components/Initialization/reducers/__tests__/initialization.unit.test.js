import InitializationReducer from "../initialization";
import {
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDeviceShortName,
    setDistroShortName,
    setDistroList,
    setLatestBuildImage,
    toggleContinueBuildModal,
} from "../../actions/initialization";

describe("Initialization reducer", () => {
    it("Default state", () => {
        expect(InitializationReducer(undefined, {})).toEqual({
            buildType: null,
            buildTypeList: [],
            buildUUID: null,
            deviceShortName: null,
            distroShortName: null,
            distroList: {},
            latestBuildImage: {},
            showContinueBuildModal: false,
        });
    });

    it("SET_BUILD_TYPE", () => {
        const buildType = "Classic image";
        const reducer = InitializationReducer({}, setBuildType("Classic image"));
        expect(reducer).toEqual({ buildType });
    });

    it("SET_BUILD_TYPE_LIST", () => {
        const buildTypeList = ["Classic image"];
        const reducer = InitializationReducer({}, setBuildTypeList(buildTypeList));
        expect(reducer).toEqual({ buildTypeList });
    });

    it("SET_BUILD_UUID", () => {
        const buildUUID = "123e4567-e89b-12d3-a456-426614174000";
        const reducer = InitializationReducer({}, setBuildUUID(buildUUID));
        expect(reducer).toEqual({ buildUUID });
    });

    it("SET_DEVICE_SHORT_NAME", () => {
        const deviceShortName = "opi-pc-plus";
        const reducer = InitializationReducer({}, setDeviceShortName(deviceShortName));
        expect(reducer).toEqual({ deviceShortName });
    });

    it("SET_DISTRO_SHORT_NAME", () => {
        const distroShortName = "debian-buster-armhf";
        const reducer = InitializationReducer({}, setDistroShortName(distroShortName));
        expect(reducer).toEqual({ distroShortName });
    });

    it("SET_DISTRO_LIST", () => {
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
        const reducer = InitializationReducer({}, setDistroList(distroList));
        expect(reducer).toEqual({ distroList });
    });

    it("SET_LATEST_BUILD_IMAGE", () => {
        const latestBuildImage = {
            image_id: "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxx",
            device_name: "rpi-3-b-plus",
            distro_name: "ubuntu-bionic-armhf",
            flavour: "Classic",
            started_at: null,
            status: "Undefined",
            notes: "",
        };
        const reducer = InitializationReducer({}, setLatestBuildImage(latestBuildImage));
        expect(reducer).toEqual({ latestBuildImage });
    });

    it("TOGGLE_CONTINUE_BUILD_MODAL with false initial value", () => {
        const reducer = InitializationReducer(
            { showContinueBuildModal: false },
            toggleContinueBuildModal(),
        );
        expect(reducer).toEqual({ showContinueBuildModal: true });
    });

    it("TOGGLE_CONTINUE_BUILD_MODAL with true initial value", () => {
        const reducer = InitializationReducer(
            { showContinueBuildModal: true },
            toggleContinueBuildModal(),
        );
        expect(reducer).toEqual({ showContinueBuildModal: false });
    });
});
