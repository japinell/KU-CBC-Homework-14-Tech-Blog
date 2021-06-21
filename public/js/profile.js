const profileHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#id").value.trim();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (id && name && email && password) {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, email, password, userUpdated: name, dateUpdated: Date.now()}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace("/");
    } else {
      alert("Failed to update profile");
    }
  }
};

document
  .querySelector(".profile-form")
  .addEventListener("submit", profileHandler);
