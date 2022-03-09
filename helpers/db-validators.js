const Role = require("../models/role");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product.js");
const { collection } = require("../models/user");

const isRoleValid = async (role = "") => {
    const existRol = await Role.findOne({ rol: role });

    if (!existRol) {
        throw new Error(`El rol (${role}) no es un rol valido`);
    }
};

const isNotRepeatEmail = async (email = "") => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`Ya existe un usuario registrado con el email (${email}) ingresado`);
    }
};

const existUseById = async (id) => {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`EL id (${id}) enviado no conincide con ningun usuario`);
    }
};

const existCategory = async (id) => {
    const _existCategory = await Category.findById(id);

    if (!_existCategory) {
        throw new Error(`EL id (${id}) enviado no coincide con ninguna categoria`);
    }
    return true;
};

const existProduct = async (id) => {
    const _existProduct = await Product.findById(id);

    if (!_existProduct) {
        throw new Error(`EL id (${id}) enviado no coincide con ningun producto`);
    }
    return true;
};

const availableCollections = async (collection = "", collections = []) => {
    if (!collections.includes(collection)) {
        throw new Error(`la coleccion enviada no es una colecion modelada`);
    }
    return true;
};

module.exports = {
    isRoleValid,
    isNotRepeatEmail,
    existUseById,
    existCategory,
    existProduct,
    availableCollections,
};
