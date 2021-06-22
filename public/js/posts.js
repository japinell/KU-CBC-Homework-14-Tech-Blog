const postSubmitHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector("#postId").value.trim();
  const title = document.querySelector("#title").value.trim();
  const contents = document.querySelector("#contents").value.trim();
  if (postId && title && contents) {
    const res = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ postId, title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.ok)
    if (res.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace("/");
    } else {
      alert("Failed to post comment");
    }
  }
};

const postCancelHandler = async (event) => {
  event.preventDefault();
  window.location.href="/login";
};

document
  .querySelector(".post-form-submit")
  .addEventListener("submit", postSubmitHandler);
document
  .querySelector(".post-form-cancel")
  .addEventListener("submit", postCancelHandler);
