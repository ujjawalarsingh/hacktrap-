// Simulate live threat data
const threats = [
    "SQLi attempt on /admin",
    "XSS payload detected",
    "Brute force attack (22/tcp)",
    "Suspicious file upload"
  ];
  
  setInterval(() => {
    const feed = document.getElementById('threat-feed');
    const event = document.createElement('div');
    event.className = 'threat-event';
    event.innerHTML = `
      <span>[${new Date().toLocaleTimeString()}]</span>
      <span>${threats[Math.floor(Math.random()*threats.length)]}</span>
      <span class="severity">HIGH</span>
    `;
    feed.prepend(event);
    if(feed.children.length > 15) feed.lastChild.remove();
  }, 2000);