const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const res = await response.json()
    if (res.success) {
        localStorage.setItem("userId", res.userId);
        // Redirect to the cars.html page on successful login            
        window.location.href = "cars.html";
    } else {
        alert("Invalid credentials");
    }
  } catch (error) {
        console.error("Error:", error);
  }
});
