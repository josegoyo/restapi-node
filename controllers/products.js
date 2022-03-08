const { response } = require("express");
const Product = require("../models/product");

const _GET = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const queryValidate = { status: true };

    try {
        const products = await Product.find(queryValidate)
            .populate("user", "fullname")
            .populate("category", "name")
            .skip(Number(from))
            .limit(Number(limit));

        res.json({
            msg: "get API - PRODUCTS CONTROLLER",
            products,
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
        const products = await Product.findById(id).populate("user", "fullname").populate("category", "name");

        res.json({
            msg: "get by id API - PRODUCTS CONTROLLER",
            products,
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
        const { name, category, price, description } = req.body;

        const productDB = await Product.findOne({ name });

        if (productDB) {
            return res.status(400).json({
                msg: "El producto ya existe en la base de datos",
            });
        }

        let data = {
            name,
            price,
            category,
            description,
            user: req.userLogged._id,
        };

        const product = new Product(data);
        await product.save();

        res.status(201).json({
            msg: "post API - PRODUCT CONTROLLER",
            product,
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
        const { name, category, price, description } = req.body;

        data = {
            name,
            price,
            category,
            description,
            user: req.userLogged._id,
        };

        const product = await Product.findByIdAndUpdate(id, data);

        res.json({
            msg: "put API - PRODUCT CONTROLLER",
            product,
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

        const product = await Product.findByIdAndUpdate(id, { status: false });

        res.json({
            msg: "delete API - PRODUCT CONTROLLER",
            product,
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
