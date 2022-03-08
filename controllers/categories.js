const { response } = require("express");
const Category = require("../models/category");

const _GET = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const queryValidate = { status: true };

    try {
        const categories = await Category.find(queryValidate)
            .populate("user", "fullname")
            .skip(Number(from))
            .limit(Number(limit));

        res.json({
            msg: "get API - CATEGORIES CONTROLLER",
            categories,
        });
    } catch (error) {
        console.log(error);

        res.json({
            msg: `Error get API - ${error}`,
        });
    }
};

const _GET_BY_ID = async (req, res = response) => {
    const { id } = req.params;

    try {
        const categories = await Category.findById(id).populate("user");

        res.json({
            msg: "get by id API - CATEGORIES CONTROLLER",
            categories,
        });
    } catch (error) {
        console.log(error);

        res.json({
            msg: `Error get by id  API - ${error}`,
        });
    }
};

const _POST = async (req, res = response) => {
    try {
        const name = req.body.name.toUpperCase();

        const categoryDB = await Category.findOne({ name });

        if (categoryDB) {
            return res.status(400).json({
                msg: "La categoria ya existe en la base de datos",
            });
        }

        let data = {
            name,
            user: req.userLogged._id,
        };

        const category = new Category(data);
        await category.save();

        res.status(201).json({
            msg: "post API - CATEGORIES CONTROLLER",
            category,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: `error post API - ${error}`,
        });
    }
};

const _PUT = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        data = {
            name: name.toUpperCase(),
            user: req.userLogged._id,
        };

        const user = await Category.findByIdAndUpdate(id, data);

        res.json({
            msg: "put API - CATEGORIES CONTROLLER",
            user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: `error put API - ${error}`,
        });
    }
};

const _DELETE = async (req, res = response) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { status: false });

        res.json({
            msg: "delete API - CATEGORIES CONTROLLER",
            category,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: `error Delete API - ${error}`,
        });
    }
};

module.exports = {
    _GET,
    _GET_BY_ID,
    _POST,
    _PUT,
    _DELETE,
};
