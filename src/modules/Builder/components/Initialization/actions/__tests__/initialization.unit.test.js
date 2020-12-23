import {
    setBuildType,
    setBuildTypeList,
    setBuildUUID,
    setDevice,
    setDeviceList,
    setDistro,
    setDistroList, toggleContinueBuildModal,
} from "../initialization";
import {
    SET_BUILD_TYPE,
    SET_BUILD_TYPE_LIST,
    SET_BUILD_UUID,
    SET_DEVICE,
    SET_DEVICE_LIST,
    SET_DISTRO,
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

    it("setDevice", () => {
        const device = {
            id: 1,
            name: "Raspberry Pi",
            generation: "",
            model: "Model B and B+",
            os: [
                {
                    id: 2,
                    full_name: "Raspbian 10 \"Buster\" (32-bit)",
                    short_name: "raspbian-buster-armhf",
                    build_type: ["Classic image"],
                    packages_url: "",
                },
            ],
        };
        const expectedAction = {
            type: SET_DEVICE,
            payload: device,
        };
        expect(setDevice(device)).toEqual(expectedAction);
    });

    it("setDeviceList", () => {
        const deviceList = [
            {
                id: 1,
                name: "Raspberry Pi",
                generation: "",
                model: "Model B and B+",
                os: [
                    {
                        id: 2,
                        full_name: "Raspbian 10 \"Buster\" (32-bit)",
                        short_name: "raspbian-buster-armhf",
                        build_type: ["Classic image"],
                        packages_url: "",
                    },
                ],
            },
            {
                id: 2,
                name: "Raspberry Pi",
                generation: "2",
                model: "Model B",
                os: [
                    {
                        id: 1,
                        full_name: "Devuan 1 \"Jessie\" (32-bit)",
                        short_name: "devuan-jessie-armhf",
                        build_type: ["Classic image"],
                        packages_url: "https://pkginfo.devuan.org/stage/jessie/jessie/",
                    },
                    {
                        id: 2,
                        full_name: "Raspbian 10 \"Buster\" (32-bit)",
                        short_name: "raspbian-buster-armhf",
                        build_type: ["Classic image"],
                        packages_url: "",
                    },
                ],
            },
        ];
        const expectedAction = {
            type: SET_DEVICE_LIST,
            payload: deviceList,
        };
        expect(setDeviceList(deviceList)).toEqual(expectedAction);
    });

    it("setDistro", () => {
        const distro = {
            id: 2,
            full_name: "Raspbian 10 \"Buster\" (32-bit)",
            short_name: "raspbian-buster-armhf",
            build_type: ["Classic image"],
            packages_url: "",
        };
        const expectedAction = {
            type: SET_DISTRO,
            payload: distro,
        };
        expect(setDistro(distro)).toEqual(expectedAction);
    });

    it("setDistroList", () => {
        const distroList = [
            {
                id: 2,
                full_name: "Raspbian 10 \"Buster\" (32-bit)",
                short_name: "raspbian-buster-armhf",
                build_type: ["Classic image"],
                packages_url: "",
            },
        ];
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
