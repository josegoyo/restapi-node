const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");

const collections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const user = await User.findById(term);

        return res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(term, "i");
    const users = await User.find({
        $or: [{ fullname: regex }, { email: regex }],
        $and: [{ status: true }],
    });

    return res.json({
        results: users,
    });
};

const serchProducts = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const product = await Product.findById(term).populate("category", "name");

        return res.json({
            results: product ? [product] : [],
        });
    }

    const regex = new RegExp(term, "i");
    const products = await Product.find({ name: regex, status: true }).populate("category", "name");

    return res.json({
        results: products,
    });
};

const serchCategory = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const category = await Category.findById(term);

        return res.json({
            results: category ? [category] : [],
        });
    }
    const regex = new RegExp(term, "i");
    const categories = await Category.find({ name: regex, status: true });

    return res.json({
        results: categories,
    });
};

const _SEARCH = (req = response, res = response) => {
    const { collection, term } = req.params;

    if (!collections.includes(collection)) {
        return res.status(400).json({
            msg: "La coleccion enviada no existe en la base de datos",
        });
    }

    switch (collection) {
        case "users":
            searchUsers(term, res);
            break;
        case "categories":
            serchCategory(term, res);
            break;
        case "products":
            serchProducts(term, res);
            break;
        default:
            res.status(500).json({
                msg: "collecion no implementada",
            });
    }
};

module.exports = {
    _SEARCH,
};
