// Smooth scroll for header buttons
document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-target");
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Blog post creation
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const addPostBtn = document.getElementById("addPostBtn");
const postList = document.getElementById("postList");

if (addPostBtn) {
  addPostBtn.addEventListener("click", () => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (!title || !content) {
      alert("Please enter both a title and some content.");
      return;
    }

    // create post card
    const post = document.createElement("article");
    post.className = "post";
    post.innerHTML = `
      <h3>${title}</h3>
      <p class="meta">Just now</p>
      <p>${content}</p>
    `;

    postList.appendChild(post);
    postTitle.value = "";
    postContent.value = "";
  });
}
// QR Code for GitHub Pages blog
const blogURL = "https://shivaniB30.github.io/career_blog/myblog.html";

new QRCode(document.getElementById("qrcode"), {
    text: blogURL,
    width: 120,
    height: 120,
    colorDark: "#5c4d7d",
    colorLight: "#ffffff"
});
