const validatorParams = require("./validator-params");
const validatorJWT = require("./validator-jwt");
const validatorRoles = require("./validator-roles");
const validatorFiles = require("./validator-files");

module.exports = {
    ...validatorParams,
    ...validatorJWT,
    ...validatorRoles,
    ...validatorFiles,
};
