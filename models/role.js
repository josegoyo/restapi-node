const { Schema, model } = require("mongoose");

const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, "El nombre del rol es requerido"],
    },
});

module.exports = model("Role", roleSchema);
