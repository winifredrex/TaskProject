function initToggleLogin() {
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");
const loginContent = document.getElementById("loginContent");
const signupContent = document.getElementById("signupContent");
const mainTitle = document.getElementById("mainTitle");
const subtitle = document.getElementById("subtitle");


// if (!tabLogin || !tabSignup) {
//     // Retry after a short delay if buttons are not yet loaded
//     console.log("Login buttons not loaded yet. Retrying...");
//     setTimeout(initToggleLogin, 100);
//     return;
// }

function showLogin() {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    loginContent.style.display = "block";
    signupContent.style.display = "none";
    mainTitle.textContent = "Welcome Back!";
    subtitle.textContent = "Enter your details to access your accounts";
}

function showSignup() {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    signupContent.style.display = "block";
    loginContent.style.display = "none";
    mainTitle.textContent = "Join TaskMaster";
    subtitle.textContent = "Create an account to boost your productivity";
}

tabLogin.addEventListener("click", showLogin);
tabSignup.addEventListener("click", showSignup);

showLogin();


}

// Call the function once at the end of your script
initToggleLogin();

document.addEventListener("DOMContentLoaded", () => {
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (name && email && password) {
        const user = { name, email, password };
        localStorage.setItem("signupUser", JSON.stringify(user));
        alert("Signup successful!");
        window.location.href = "/modules/dashboard/dashboard.html"; // redirect
    } else {
        alert("Please fill all fields");
    }
});

});


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginContent form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;

        // Retrieve user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("signupUser"));

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        // Check login credentials
        if (loginEmail === storedUser.email && loginPassword === storedUser.password) {
            alert(`Welcome back, ${storedUser.name}!`);
            // Redirect or load dashboard here
        } else {
            alert("Incorrect email or password.");
        }
    });
});

