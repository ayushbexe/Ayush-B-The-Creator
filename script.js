fetch('data.json')
  .then(res => res.json())
  .then(data => {

    /* ===== profile content ===== */
    document.getElementById('name').textContent = data.profile.name;
    document.getElementById('software').textContent =
  `Works with ${data.profile.software}`;

    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.innerHTML = data.profile.about.replace(/\n/g, '<br><br>');
    }

    /* ===== theme system ===== */
    const root = document.documentElement;
    const themes = data.themes;

    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    let currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    function applyTheme(name) {
      const theme = themes[name];

      root.style.setProperty('--bg', theme.bg);
      root.style.setProperty('--surface', theme.surface);
      root.style.setProperty('--text', theme.text);
      root.style.setProperty('--muted', theme.muted);
      root.style.setProperty('--accent', theme.accent);
      root.style.setProperty('--accent-strong', theme.accentStrong);
      root.style.setProperty('--max-width', theme.maxWidth);

      icon.textContent = name === 'dark' ? 'dark_mode' : 'light_mode';
      document.documentElement.setAttribute('data-theme', name);
      localStorage.setItem('theme', name);
    }

    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });

    /* ===== contact page ===== */
    if (data.contact) {
      const emailEl = document.getElementById('contact-email');
      const phoneEl = document.getElementById('contact-phone');
      const githubEl = document.getElementById('contact-github');

      if (emailEl) {
        emailEl.textContent = data.contact.email;
        emailEl.href = `mailto:${data.contact.email}`;
      }

      if (phoneEl) {
        phoneEl.textContent = data.contact.phone;
        phoneEl.href = `tel:${data.contact.phone.replace(/\s+/g, '')}`;
      }

      if (githubEl) {
        githubEl.textContent = data.contact.github.replace('https://', '');
        githubEl.href = data.contact.github;
      }
    }

  })
  .catch(err => console.error(err));
