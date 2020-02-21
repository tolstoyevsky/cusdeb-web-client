import Initialization from "modules/Builder/components/Initialization/Initialization";
import PackageList from "modules/Builder/components/PackageList/PackageList";
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
        path: `${routeBasePath}/usergroups`,
        title: "User and groups",
        main: "",
        icon: faUsers,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/configuration`,
        title: "Configuration",
        main: "",
        icon: faCogs,
        icon_style: "",
    },
    {
        path: `${routeBasePath}/build`,
        title: "Build",
        main: "",
        icon: faWrench,
        icon_style: "fa-flip-horizontal",
    },
];

const baseRouteIndex = 0;
const baseRoute = routes[baseRouteIndex];

export { routes, baseRouteIndex, baseRoute };
