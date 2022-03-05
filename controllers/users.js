const { response } = require("express");

const _GET = (req, res = response) => {
    res.json({
        msg: "get API - CONTROLLER",
    });
};
const _POST = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: "post API - CONTROLLER",
        body,
    });
};

const _PUT = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: "put API - CONTROLLER",
        id,
    });
};

const _PATCH = (req, res = response) => {
    res.json({
        msg: "patch API - CONTROLLER",
    });
};

const _DELETE = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: "delete API - CONTROLLER",
    });
};

module.exports = {
    _GET,
    _POST,
    _PUT,
    _DELETE,
    _PATCH,
};
