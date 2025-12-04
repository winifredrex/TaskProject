function initToggleLogin() {
    const tabLogin = document.getElementById("tabLogin");
    const tabSignup = document.getElementById("tabSignup");
    const loginContent = document.getElementById("loginContent");
    const signupContent = document.getElementById("signupContent");
    const mainTitle = document.getElementById("mainTitle");
    const subtitle = document.getElementById("subtitle");

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

    tabLogin.addEventListener("click", () => {
        console.log("tabLogin clicked");
        showLogin();
    });

    tabSignup.addEventListener("click", () => {
        console.log("tabSignup clicked");
        showSignup();
    });

    showLogin();
}

initToggleLogin();

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (name && email && password) {
            const user = { name, email, password };
            localStorage.setItem("signupUser", JSON.stringify(user));
            alert("Signup successful!");
            window.location.href = "/modules/dashboard/dashboard.html";
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

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === loginEmail);

        if (!user) {
            alert("No user found with this email. Please sign up first.");
            return;
        }

        if (loginPassword === user.password) {
            alert(`Welcome back, ${user.name}!`);
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "/modules/dashboard/dashboard.html";
        } else {
            alert("Incorrect password.");
        }
    });
});

document.addEventListener("click", (e) => {
    if (e.target.closest("#signupButton")) {
        e.preventDefault();
        console.log("Next Step button clicked!");
    }
});

document.addEventListener("click", (e) => {
    const nextBtn = e.target.closest("#signupButton");

    if (nextBtn) {
        e.preventDefault();

        const name = document.getElementById("signupName")?.value.trim();
        const email = document.getElementById("signupEmail")?.value.trim();
        const password = document.getElementById("signupPassword")?.value;

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = { name, email, password };
        const exists = users.some(u => u.email === email);
        
        if (exists) {
            alert("This email is already registered.");
            return;
        }

        users.push(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Signup data saved successfully!");
        window.location.href = "http://127.0.0.1:5500/modules/login/dashboard/dashboard.html";
    }
});