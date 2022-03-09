const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, _fileExtensions = [], dir = "") => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const fileNameSplit = archivo.name.split(".");
        const fileExtension = fileNameSplit[fileNameSplit.length - 1];
        const fileValids = _fileExtensions;

        if (!fileValids.includes(fileExtension)) {
            reject(`El archivo con extension .${fileExtension}, no es valido para su carga`);
        }

        const tempFileUploadedName = uuidv4() + "." + fileExtension;
        uploadPath = path.join(__dirname, "../uploads/", dir, tempFileUploadedName);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }

            resolve(tempFileUploadedName);
        });
    });
};

module.exports = {
    uploadFile,
};
