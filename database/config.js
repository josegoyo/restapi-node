const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS);

        console.log("Base de datos online");
    } catch (error) {
        console.log(error);
        throw new Error("error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection,
};
