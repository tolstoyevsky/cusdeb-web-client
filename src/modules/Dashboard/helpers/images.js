export const formatImagesList = (imagesList) => {
    const imagesObject = {};

    imagesList.forEach((image) => {
        const { image_id, ...rest } = image; // eslint-disable-line camelcase
        imagesObject[image_id] = rest;
    });

    return imagesObject;
};
