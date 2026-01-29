fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // ===== profile content =====
    document.getElementById('name').textContent = data.profile.name;
    document.getElementById('software').textContent = data.profile.software;
    document.getElementById('about').textContent = data.profile.about;

    // ===== theme → CSS variables =====
    const root = document.documentElement;
    const themes = data.themes;

// load saved theme or default to dark
let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

function applyTheme(name) {
  const theme = themes[name];
  root.style.setProperty('--bg', theme.bg);
  root.style.setProperty('--text', theme.text);
  root.style.setProperty('--muted', theme.muted);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--max-width', theme.maxWidth);
  localStorage.setItem('theme', name);
}

// toggle button
document.getElementById('theme-toggle').addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});


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

    // ===== experience =====

    const experienceList = document.getElementById('experience-list');

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

    
  })
  .catch(err => console.error(err));
