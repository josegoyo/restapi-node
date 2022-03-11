const { _validateJWTBackend } = require("../helpers/jwt");
const ChatMessages = require("../models/chat-messages");

const chatMessage = new ChatMessages();

const socketController = async (client, io) => {
    const token = client.handshake.headers["x-token"];
    const user = await _validateJWTBackend(token);

    if (!user) {
        return client.disconnect();
    }

    chatMessage.connectUser(user);
    io.emit("active-users", chatMessage.usersArr);

    // get last ten messages but only for the logged user
    client.emit("recive-messages", chatMessage.lastTen);

    // connect me to private room with my uid like as identifier
    client.join(user.id);

    client.on("disconnect", () => {
        chatMessage.disconnectUser(user.id);
        io.emit("active-users", chatMessage.usersArr);
    });

    client.on("send-message-frontend", (payload) => {
        if (payload.uid) {
            // private message
            client.to(payload.uid).emit("private-message", { de: user.fullname, message: payload.message });
        } else {
            chatMessage.sendMessage(user.uid, user.fullname, payload.message);
            io.emit("recive-messages", chatMessage.lastTen);
        }
    });
};

module.exports = { socketController };
