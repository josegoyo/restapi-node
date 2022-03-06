const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const _GET = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const queryValidate = { status: true };

    const [users, totals] = await Promise.all([
        User.find(queryValidate).skip(Number(from)).limit(Number(limit)),
        User.countDocuments(queryValidate),
    ]);

    res.json({
        msg: "get API - CONTROLLER",
        users,
        totals,
    });
};

const _POST = async (req, res = response) => {
    const { fullname, email, password, role } = req.body;
    const user = new User({
        fullname,
        email,
        password,
        role,
    });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        msg: "post API - CONTROLLER",
        user,
    });
};

const _PUT = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: "put API - CONTROLLER",
        user,
    });
};

const _DELETE = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: "delete API - CONTROLLER",
        user,
    });
};

module.exports = {
    _GET,
    _POST,
    _PUT,
    _DELETE,
};
