import InitializationReducer from "../initialization";
import {
    setBuildType,
    setBuildTypeList,
    setBuildUUID, setDevice, setDeviceList, setDistro, setDistroList, toggleContinueBuildModal,
} from "../../actions/initialization";

describe("Initialization reducer", () => {
    it("Default state", () => {
        expect(InitializationReducer(undefined, {})).toEqual({
            buildType: null,
            buildTypeList: [],
            buildUUID: null,
            device: null,
            deviceList: [],
            distro: null,
            distroList: [],
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

    it("SET_DEVICE", () => {
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
        const reducer = InitializationReducer({}, setDevice(device));
        expect(reducer).toEqual({ device });
    });

    it("SET_DEVICE_LIST", () => {
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
        const reducer = InitializationReducer({}, setDeviceList(deviceList));
        expect(reducer).toEqual({ deviceList });
    });

    it("SET_DISTRO", () => {
        const distro = {
            id: 2,
            full_name: "Raspbian 10 \"Buster\" (32-bit)",
            short_name: "raspbian-buster-armhf",
            build_type: ["Classic image"],
            packages_url: "",
        };
        const reducer = InitializationReducer({}, setDistro(distro));
        expect(reducer).toEqual({ distro });
    });

    it("SET_DISTRO_LIST", () => {
        const distroList = [
            {
                id: 2,
                full_name: "Raspbian 10 \"Buster\" (32-bit)",
                short_name: "raspbian-buster-armhf",
                build_type: ["Classic image"],
                packages_url: "",
            },
        ];
        const reducer = InitializationReducer({}, setDistroList(distroList));
        expect(reducer).toEqual({ distroList });
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
