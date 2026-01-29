fetch('data.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('name').textContent = data.name;
    document.getElementById('software').textContent =
      `Software: ${data.software}`;
    document.getElementById('about').textContent = data.about;
  })
  .catch(err => console.error(err));
