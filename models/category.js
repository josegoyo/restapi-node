const { Schema, model } = require("mongoose");

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoria es requerida"],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// delete pass in my response
categorySchema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;

    return category;
};

module.exports = model("Category", categorySchema);
