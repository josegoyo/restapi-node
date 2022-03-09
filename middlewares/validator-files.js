const validateFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send({ msg: "Es necesario enviar el archivo." });
    }

    next();
};

module.exports = { validateFile };
