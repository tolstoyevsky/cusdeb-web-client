// <column title>: <attribute key>
const TABLE_COLUMNS = {
    Username: "username",
    UID: "uid",
    GID: "gid",
    Comment: "comment",
    "Home directory": "homedir",
    Shell: "shell",
};

const USER_ATTRIBUTES = ["username", "password", "uid", "gid", "comment", "homedir", "shell"];

const ORDINARY_USER_UID = 1000;

export {
    TABLE_COLUMNS,
    USER_ATTRIBUTES,
    ORDINARY_USER_UID,
};
