document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    const data = await response.json();

    if (data.role === "admin") {
        window.location.href = "/admin-dashboard";
    }
    else if (data.role === "user") {
        window.location.href = "/user-dashboard";
    }
    else {
        alert(data.message);
    }
});