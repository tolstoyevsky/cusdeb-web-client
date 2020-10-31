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

export const formatDeviceList = (deviceList) => (
    deviceList.map((device) => ({
        value: device.id,
        text: formatDeviceTitle(device),
    }))
);

export const formatDistroList = (distroList) => (
    distroList.map((distro) => ({
        value: distro.short_name,
        text: distro.full_name,
    }))
);

export const formatBuildTypeList = (buildTypeList) => (
    buildTypeList.map((buildType) => ({
        value: buildType,
        text: buildType,
    }))
);
