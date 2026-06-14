 // ===== Theme toggle =====
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });

  // ===== Mobile nav =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
  }));

  // ===== Reveal on scroll =====
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ===== Active nav link on scroll =====
  const navAnchors = document.querySelectorAll('[data-nav]');
  const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href')));
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = document.querySelector('[data-nav][href="#' + entry.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(sec => sec && navObserver.observe(sec));

  // ===== Terminal typing animation =====
  const termBody = document.getElementById('term-body');
  const termLines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'william_samwaka — CS student, NIPA Lusaka' },
    { type: 'cmd', text: 'cat focus.txt' },
    { type: 'out', text: 'web development · game development · systems programming' },
    { type: 'cmd', text: 'lox run hello.lox' },
    { type: 'out', text: '> Hello, World' },
    { type: 'out', text: '> compiled in 11ms — 0 errors' },
    { type: 'cmd', text: '_' }
  ];

  let li = 0, ci = 0;
  function typeNext() {
    if (li >= termLines.length) {
      setTimeout(() => { termBody.innerHTML = ''; li = 0; ci = 0; typeNext(); }, 2200);
      return;
    }
    const line = termLines[li];
    let row = termBody.lastElementChild;
    if (ci === 0) {
      row = document.createElement('div');
      row.className = 'term-line';
      const prefix = line.type === 'cmd' ? '<span class="term-prompt">william@nipa:~$ </span>' : '';
      const cls = line.type === 'out' ? ' term-out' : '';
      row.innerHTML = prefix + '<span class="term-text' + cls + '"></span><span class="term-cursor"></span>';
      termBody.appendChild(row);
    }
    const textSpan = row.querySelector('.term-text');
    if (ci < line.text.length) {
      textSpan.textContent += line.text[ci];
      ci++;
      setTimeout(typeNext, line.type === 'cmd' ? 55 : 14);
    } else {
      const cursor = row.querySelector('.term-cursor');
      if (li < termLines.length - 1 && cursor) cursor.remove();
      li++; ci = 0;
      setTimeout(typeNext, 400);
    }
  }
  typeNext();

  // ===== Footer year =====
  document.getElementById('year').textContent = new Date().getFullYear();