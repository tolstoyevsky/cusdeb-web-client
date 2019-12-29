const READY = 10;
const BUSY = 12;
const LOCKED = 13;
const PREPARE_ENV = 14;
const MARK_ESSENTIAL_PACKAGES_AS_INSTALLED = 15;
const INSTALL_KEYRING_PACKAGE = 16;
const UPDATE_INDICES = 17;
const MAINTENANCE_MODE = 23;
const UNKNOW_BUILD_TYPE = 24;

const CODE = {
    READY, BUSY, LOCKED, PREPARE_ENV, MARK_ESSENTIAL_PACKAGES_AS_INSTALLED,
    INSTALL_KEYRING_PACKAGE, UPDATE_INDICES, MAINTENANCE_MODE,
    UNKNOW_BUILD_TYPE,
};

const MAINTENANCE_MODE_MSG = "Maintenance mode";
const PREPARE_ENV_MSG = "Prepare resolver environment";
const MARK_ESSENTIAL_PACKAGES_AS_INSTALLED_MSG = "Mark essential packages as installed";
const INSTALL_KEYRING_PACKAGE_MSG = "Install debian-archive-keyring package";
const UPDATE_INDICES_MSG = "Update package index files";
const UNKNOW_BUILD_TYPE_MSG = "Unknown build type";

const MSG = {
    MAINTENANCE_MODE_MSG, PREPARE_ENV_MSG, MARK_ESSENTIAL_PACKAGES_AS_INSTALLED_MSG,
    INSTALL_KEYRING_PACKAGE_MSG, UPDATE_INDICES_MSG, UNKNOW_BUILD_TYPE_MSG,
};

const BUILD_TYPE_CODES = {
    "Classic image": 1,
    "Mender-compatible image": 2,
    "Mender artifact": 3,
};

export { CODE, MSG, BUILD_TYPE_CODES };
