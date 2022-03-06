const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = {
    isRoleValid,
    isNotRepeatEmail,
    existUseById,
};
