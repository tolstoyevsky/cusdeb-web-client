import {
    faMicrochip,
    faList,
    faUsers,
    faCogs,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

import Build from "modules/Builder/components/Build/Build";
import Configuration from "modules/Builder/components/Configuration/Configuration";
import Initialization from "modules/Builder/components/Initialization/components/Initialization/Initialization";
import PackageList from "modules/Builder/components/PackageList/PackageList";
import Users from "modules/Builder/components/Users/Users";

const routeBasePath = "/builder";
const BUILDER_STAGES = {
    initialization: {
        path: `${routeBasePath}/initialization`,
        title: "Initialization",
        main: Initialization,
        icon: faMicrochip,
        icon_style: "",
    },
    packagelist: {
        path: `${routeBasePath}/packagelist`,
        title: "Package list",
        main: PackageList,
        icon: faList,
        icon_style: "",
    },
    users: {
        path: `${routeBasePath}/users`,
        title: "Users",
        main: Users,
        icon: faUsers,
        icon_style: "",
    },
    configuration: {
        path: `${routeBasePath}/configuration`,
        title: "Configuration",
        main: Configuration,
        icon: faCogs,
        icon_style: "",
    },
    build: {
        path: `${routeBasePath}/build`,
        title: "Build",
        main: Build,
        icon: faWrench,
        icon_style: "fa-flip-horizontal",
    },
};

const BACK_BUTTON_ACTIVE_STAGES = ["configuration", "users"];

const NEXT_BUTTON_INACTIVE_STAGES = ["build"];

export { BUILDER_STAGES, BACK_BUTTON_ACTIVE_STAGES, NEXT_BUTTON_INACTIVE_STAGES };
