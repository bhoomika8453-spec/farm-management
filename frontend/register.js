document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    const data = await response.json();

    alert(data.message || data.error);

    window.location.href = "/";
});