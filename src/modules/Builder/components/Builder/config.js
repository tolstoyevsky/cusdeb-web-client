import Build from "modules/Builder/components/Build/Build";
import Configuration from "modules/Builder/components/Configuration/Configuration";
import Initialization from "modules/Builder/components/Initialization/Initialization";
import PackageList from "modules/Builder/components/PackageList/PackageList";
import Users from "modules/Builder/components/Users/Users";

import {
    faMicrochip,
    faList,
    faUsers,
    faCogs,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

const routeBasePath = "/builder";
const routes = [
    {
        path: `${routeBasePath}/initialization`,
        title: "Initialization",
        main: Initialization,
        icon: faMicrochip,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/packagelist`,
        title: "Package list",
        main: PackageList,
        icon: faList,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/users`,
        title: "Users",
        main: Users,
        icon: faUsers,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/configuration`,
        title: "Configuration",
        main: Configuration,
        icon: faCogs,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/build`,
        title: "Build",
        main: Build,
        icon: faWrench,
        icon_style: "fa-flip-horizontal",
    },
];

const baseRouteIndex = 0;

export { routes, baseRouteIndex };
