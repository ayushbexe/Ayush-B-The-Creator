fetch('data.json')
  .then(res => res.json())
  .then(data => {

    /* ===== profile content ===== */
    document.getElementById('name').textContent = data.profile.name;
    const locationEl = document.getElementById('location');
if (locationEl) {
  locationEl.textContent = data.profile.location;
}
    document.getElementById('software').textContent =
      `Works with ${data.profile.software}`;
    document.getElementById('about').innerHTML =
  data.profile.about.replace(/\n/g, '<br><br>');


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

      localStorage.setItem('theme', name);
    }

    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });

    /* ===== projects ===== */
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

    /* ===== experience ===== */
    const experienceList = document.getElementById('experience-list');

    if (data.experience && experienceList) {
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

/* ===== header scroll shadow ===== */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

    const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

    
  })
  .catch(err => console.error(err));
