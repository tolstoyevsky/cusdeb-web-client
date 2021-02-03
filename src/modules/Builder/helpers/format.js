export const formatDeviceTitle = (device) => {
    let title = "";
    if (device.name) {
        title = `${title} ${device.name}`;
    }
    if (device.generation) {
        title = `${title} ${device.generation}`;
    }
    if (device.model) {
        title = `${title} ${device.model}`;
    }

    return title.trim();
};

export const formatDistroTitle = (distro) => {
    let title = "";
    if (distro.name) {
        title = `${title} ${distro.name}`;
    }
    if (distro.version) {
        title = `${title} ${distro.version}`;
    }
    if (distro.codename) {
        title = `${title} ${distro.codename}`;
    }

    return title.trim();
};

export const formatDeviceList = (deviceList) => (
    Object.keys(deviceList).map((deviceShortName) => ({
        value: deviceShortName,
        text: formatDeviceTitle(deviceList[deviceShortName]),
    }))
);

export const formatDistroList = (distroList) => (
    Object.keys(distroList).map((distroShortName) => ({
        value: distroShortName,
        text: formatDistroTitle(distroList[distroShortName]),
    }))
);

export const formatBuildTypeList = (buildTypeList) => (
    buildTypeList.map((buildType) => ({
        value: buildType,
        text: buildType[0].toUpperCase() + buildType.slice(1),
    }))
);
