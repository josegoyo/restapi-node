const validatorParams = require("./validator-params");
const validatorJWT = require("./validator-jwt");
const validatorRoles = require("./validator-roles");

module.exports = {
    ...validatorParams,
    ...validatorJWT,
    ...validatorRoles,
};
