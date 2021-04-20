import { setDeviceList } from "../../actions/common";
import CommonReducer from "../common";

describe("Common reducer", () => {
    it("Default state", () => {
        expect(CommonReducer(undefined, {})).toEqual({
            deviceList: {},
        });
    });

    it("SET_DEVICE_LIST", () => {
        const deviceList = {
            "opi-pc-plus": {
                distros: {
                    "debian-buster-arm  hf": {
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
        const reducer = CommonReducer({}, setDeviceList(deviceList));
        expect(reducer).toEqual({ deviceList });
    });
});
