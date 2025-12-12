// script.js - smooth scroll, blog (localStorage), QR code, accessibility
document.addEventListener('DOMContentLoaded', () => {

  // === smooth scrolling for nav buttons ===
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // === blog using localStorage ===
  const STORAGE_KEY = 'shivani_blog_posts_v2';
  const titleEl = document.getElementById('postTitle');
  const contentEl = document.getElementById('postContent');
  const addBtn = document.getElementById('addPostBtn');
  const postList = document.getElementById('postList');

  function loadPosts() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { console.warn('posts parse error', e); return []; }
  }

  function savePosts(posts) { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }

  function renderPosts() {
    const posts = loadPosts();
    postList.innerHTML = '';
    if (!posts.length) {
      // starter post
      postList.innerHTML = `
        <div class="post">
          <h3>My Journey into Computer Science</h3>
          <p class="meta">December 2025</p>
          <p>I chose Computer Science because I enjoy solving problems and building useful things. Exploring cloud computing and AI/ML has made me even more excited about this field.</p>
        </div>`;
      return;
    }
    // newest first
    posts.slice().reverse().forEach(p => {
      const node = document.createElement('div');
      node.className = 'post';
      node.innerHTML = `<h3>${escapeHtml(p.title)}</h3>
                        <p class="meta">${escapeHtml(p.date)}</p>
                        <p>${escapeHtml(p.content)}</p>`;
      postList.appendChild(node);
    });
  }

  function addPost(title, content) {
    const posts = loadPosts();
    posts.push({ title, content, date: new Date().toLocaleString() });
    savePosts(posts);
    renderPosts();
  }

  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = titleEl.value.trim();
      const content = contentEl.value.trim();
      if (!title || !content) { alert('Please enter both a title and content.'); return; }
      addPost(title, content);
      titleEl.value = '';
      contentEl.value = '';
    });
  }

  // === generate QR code (replace blogURL with your actual site) ===
  const qrcodeEl = document.getElementById('qrcode');
  const blogURL = 'https://shivaniB30.github.io/career_blog/myblog.html';
  if (qrcodeEl && window.QRCode) {
    qrcodeEl.innerHTML = ''; // clear
    new QRCode(qrcodeEl, { text: blogURL, width: 120, height: 120, colorDark: '#111', colorLight: '#fff' });
  }

  // small HTML-escape helper
  function escapeHtml(s){ if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

  // initial render
  renderPosts();

  // keyboard accessibility: allow Enter on skill items to animate
  document.querySelectorAll('.skills-list li').forEach(li => {
    li.setAttribute('tabindex', '0');
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        li.animate([{ transform: 'translateY(-8px) scale(1.02)' }, { transform: 'none' }], { duration: 220, easing: 'ease-out' });
      }
    });
  });

});
