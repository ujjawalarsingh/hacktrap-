const alerts = [
    "Employee credentials found on pastebin",
    "Your API key mentioned in hacker forum",
    "Domain appears in ransomware leak site"
  ];
  
  setInterval(() => {
    if(Math.random() > 0.7) {
      const container = document.getElementById('darkweb-alerts');
      const alert = document.createElement('div');
      alert.className = 'alert';
      alert.innerHTML = `
        <span>⚠️</span>
        <span>${alerts[Math.floor(Math.random()*alerts.length)]}</span>
        <span>${Math.floor(Math.random()*60)}m ago</span>
      `;
      container.prepend(alert);
      if(container.children.length > 5) container.lastChild.remove();
    }
  }, 5000);