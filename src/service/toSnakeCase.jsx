export const toSnakeCase = (str) => {
    return str.toLowerCase().replace(/-/g, '_');
};