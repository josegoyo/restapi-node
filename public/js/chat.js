const _url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth"
    : "http://localhost:8080/api/auth";

let userLogged = null;
let socketCient = null;

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessages = document.querySelector("#ulMessages");
const btnExit = document.querySelector("#btnExit");

const validarJWT = async () => {
    const _tokenLocal = localStorage.getItem("x-token");

    if (_tokenLocal.length < 10) {
        window.location = "index.html";
        throw new Error("NO HAY TOKEN EN EL SEVIDOR");
    }

    const response = await fetch(_url, {
        headers: {
            "x-token": _tokenLocal,
        },
    });

    //Faltan validaciones
    const { user, token } = await response.json();

    localStorage.setItem("x-token", token);
    userLogged = user;
    document.title = user.fullname;
    await connectSocket();
};

const connectSocket = async () => {
    socketCient = io({
        extraHeaders: {
            "x-token": localStorage.getItem("x-token"),
        },
    });

    socketCient.on("connect", () => {
        console.log("socket online");
    });
    socketCient.on("disconnect", () => {
        console.log("socket disconnect");
    });

    socketCient.on("recive-messages", (payload) => {
        console.log("recive-messages", payload);
        showMessages(payload);
    });
    socketCient.on("active-users", (payload) => {
        console.log("frontend payload", payload);
        showUsers(payload);
    });
    socketCient.on("private-message", (payload) => {
        console.log("privado", payload);
    });
};

const showUsers = (users = []) => {
    let htmlUsers = "";

    users.forEach(({ fullname, uid }) => {
        htmlUsers += `
            <li>
                <p>
                    <h5 class="text-success">${fullname}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        
        `;
    });

    ulUsers.innerHTML = htmlUsers;
};

const showMessages = (messages = []) => {
    let htmlMessages = "";

    messages.forEach(({ message, username }) => {
        htmlMessages += `
            <li>
                <p>
                    <span class="text-primary">${message}</span>
                    <span class="fs-6 text-muted">${username}</span>
                </p>
            </li>
        
        `;
    });

    ulMessages.innerHTML = htmlMessages;
};

txtMessage.addEventListener("keyup", ({ keyCode }) => {
    const message = txtMessage.value;
    const uid = txtUid.value;

    if (keyCode !== 13) {
        return;
    }

    if (message.length === 0) {
        return;
    }

    let payload = {
        message,
        uid,
    };

    socketCient.emit("send-message-frontend", payload);
    txtMessage.value = "";
});

const main = async () => {
    await validarJWT();
};

main();
