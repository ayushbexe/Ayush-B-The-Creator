fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // ===== profile content =====
    document.getElementById('name').textContent = data.profile.name;
    document.getElementById('software').textContent =
      `Software: ${data.profile.software}`;
    document.getElementById('about').textContent = data.profile.about;

    // ===== theme → CSS variables =====
    const root = document.documentElement;
    const theme = data.theme;

    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--max-width', theme.maxWidth);

    // ===== projects =====
    const projectList = document.getElementById('project-list');

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
  })
  .catch(err => console.error(err));
