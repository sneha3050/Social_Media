const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email !== "" && password !== "") {
        window.location.href = "social.html";
    } else {
        alert("Please enter email and password.");
    }
}
