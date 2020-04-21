const columnTitles = ["", "Package\u00A0name", "Description", "Version", "Size"];
const fieldsName = ["action", "package", "description", "version", "size"];

const itemsPerPageOptions = [
    {
        value: 10,
        text: 10,
    },
    {
        value: 25,
        text: 25,
    },
    {
        value: 50,
        text: 50,
    },
];

const paginationPagesCount = 5;

export {
    columnTitles,
    fieldsName,
    itemsPerPageOptions,
    paginationPagesCount,
};
