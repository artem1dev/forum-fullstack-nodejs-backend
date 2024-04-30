/**
 * Check if a document with the specified field and value exists in the database.
 * @param {Function} Service - The service class or function.
 * @param {string} field - The field to check.
 * @param {string} value - The value to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the document exists, false otherwise.
 */
const isExist = async (Service, field, value) => {
    const service = new Service();
    const isExistValue = await service.isExist(field, value);
    return isExistValue;
};

export default isExist;
