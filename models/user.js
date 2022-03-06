const { Schema, model } = require("mongoose");

const userSchema = Schema({
    fullname: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contrasena es requerido"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

// delete pass in my response
userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

module.exports = model("User", userSchema);
