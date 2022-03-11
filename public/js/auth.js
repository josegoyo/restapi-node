const myForm = document.querySelector("form");

const _url = window.location.hostname.includes("localhost")
    ? "http://localhost:8080/api/auth/"
    : "http://localhost:8080/api/auth/";

myForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let formData = {};
    for (let el of myForm.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    fetch(_url + "login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("response", response);
            localStorage.setItem("userEmailLogged", response.user.email);
            localStorage.setItem("x-token", response.token);
            //location.reload();
            window.location = "chat.html";
        })
        .catch((error) => {
            console.log("Error front google sing-in", error);
        });

    console.log(formData);
});

function handleCredentialResponse(response) {
    // google token
    console.log(response.credential);

    const _body = {
        id_token: response.credential,
    };

    fetch(_url + "google", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(_body),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log("response", response);
            localStorage.setItem("userEmailGooleLogged", response.user.email);
            localStorage.setItem("x-token", response.token);
            //location.reload();
            window.location = "chat.html";
        })
        .catch((error) => {
            console.log("Error front google sing-in", error);
        });
}

//SignOut
const btn_signOut = document.getElementById("google_signout");

btn_signOut.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem("userEmailGooleLogged"), () => {
        localStorage.clear();
        location.reload();
    });
};
