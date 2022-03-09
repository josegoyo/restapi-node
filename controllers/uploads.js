const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { uploadFile } = require("../helpers/upload-file");

const User = require("../models/user");
const Product = require("../models/product");
const extensions = ["png", "jpg", "jpeg", "gif"];

const _GET = async (req = request, res = response) => {
    const { collection, id } = req.params;

    let modelo;

    switch (collection) {
        case "users":
            modelo = await User.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    json: `No existe un usuario con el id ${id}`,
                });
            }

            break;
        case "products":
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    json: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: `Metodo no implementado` });
    }

    let pathImg = "";

    if (modelo.img) {
        pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    pathImg = path.join(__dirname, "../assets/no-image.jpg");
    res.sendFile(pathImg);
};

const _POST = async (req = request, res = response) => {
    try {
        const responseUploaded = await uploadFile(req.files, extensions, "imgs");
        res.json({
            image: responseUploaded,
        });
    } catch (error) {
        res.status(400).json({
            error,
        });
    }
};

const _PUT = async (req = request, res = response) => {
    const { collection, id } = req.params;

    let modelo;

    switch (collection) {
        case "users":
            modelo = await User.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    json: `No existe un usuario con el id ${id}`,
                });
            }

            break;
        case "products":
            modelo = await Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    json: `No existe un producto con el id ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: `Metodo no implementado` });
    }

    if (modelo.img) {
        const pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const responseUploaded = await uploadFile(req.files, extensions, collection);
    modelo.img = responseUploaded;
    await modelo.save();

    res.json({
        msg: "PUT UPLOAD IMAGES API",
        modelo,
    });
};

module.exports = {
    _POST,
    _PUT,
    _GET,
};
