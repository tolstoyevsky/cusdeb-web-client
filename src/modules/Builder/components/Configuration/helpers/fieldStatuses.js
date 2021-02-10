export const isBuildStageAvailable = (fieldStatuses) => (
    !Object.keys(fieldStatuses).length || Object.values(fieldStatuses).every((field) => !!field)
);
