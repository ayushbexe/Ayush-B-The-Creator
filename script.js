fetch('data.json')
  .then(res => res.json())
  .then(data => {

    /* ===== profile ===== */
    const nameEl = document.getElementById('name');
    if (nameEl) nameEl.textContent = data.profile.name;

    const softwareEl = document.getElementById('software');
    if (softwareEl) {
      softwareEl.textContent = `Works with ${data.profile.software}`;
    }

    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.innerHTML = data.profile.about.replace(/\n/g, '<br><br>');
    }

    /* ===== theme ===== */
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

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
      });
    }

    /* ===== projects ===== */
    const projectList = document.getElementById('project-list');
    if (projectList && data.projects) {
      data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project';

        div.innerHTML = `
          <div class="project-title">${project.title}</div>
          <div class="project-year">${project.year}</div>
          <div class="project-desc">${project.description}</div>
        `;

        projectList.appendChild(div);
      });
    }

    /* ===== experience ===== */
    const experienceList = document.getElementById('experience-list');
    if (experienceList && data.experience) {
      data.experience.forEach(item => {
        const div = document.createElement('div');
        div.className = 'role';

        div.innerHTML = `
          <div class="role-title">${item.role}</div>
          <div class="role-company">${item.company}</div>
          <div class="role-period">${item.period}</div>
          <div class="role-summary">${item.summary}</div>
        `;

        experienceList.appendChild(div);
      });
    }

    /* ===== contact ===== */
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

    /* ===== footer year ===== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

  })
  .catch(err => console.error(err));
