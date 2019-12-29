import Initialization from "modules/Builder/components/Initialization/Initialization";
import PackageList from "modules/Builder/components/PackageList/PackageList";

const routeBasePath = "/builder";
const routes = [
    {
        path: `${routeBasePath}/initialization`,
        title: "Initialization",
        main: Initialization,
    },
    {
        path: `${routeBasePath}/desktop`,
        title: "Desktop environment",
        main: "",
    },
    {
        path: `${routeBasePath}/packagelist`,
        title: "Package list",
        main: PackageList,
    },
    {
        path: `${routeBasePath}/usergroups`,
        title: "User and groups",
        main: "",
    },
    {
        path: `${routeBasePath}/configuration`,
        title: "Configuration",
        main: "",
    },
    {
        path: `${routeBasePath}/build`,
        title: "Build",
        main: "",
    },
];

const baseRouteIndex = 0;
const baseRoute = routes[baseRouteIndex];

export { routes, baseRouteIndex, baseRoute };