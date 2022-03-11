class Message {
    constructor(uid, username, message) {
        this.uid = uid;
        this.username = username;
        this.message = message;
    }
}

class ChatMessages {
    constructor() {
        this.messages = [];
        this.users = {};
    }

    get lastTen() {
        this.messages = this.messages.splice(0, 10);
        return this.messages;
    }

    get usersArr() {
        return Object.values(this.users);
    }

    sendMessage(uid, username, message) {
        this.messages.unshift(new Message(uid, username, message));
    }

    connectUser(user) {
        this.users[user.id] = user;
    }

    disconnectUser(uid) {
        delete this.users[uid];
    }
}

module.exports = ChatMessages;
