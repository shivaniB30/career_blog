// Smooth Scroll
document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const el = document.getElementById(btn.dataset.target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
});

// LOCAL STORAGE BLOG
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postList = document.getElementById("postList");
const addPostBtn = document.getElementById("addPost

