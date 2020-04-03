export const parseDateString = (dateString) => {
    const date = new Date();
    date.setTime(Date.parse(dateString));
    return date.toGMTString();
};
