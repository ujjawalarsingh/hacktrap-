const cpuGauge = document.getElementById("cpu-gauge");
const memoryGauge = document.getElementById("memory-gauge");
const threatGauge = document.getElementById("threat-gauge");

function updateGauges() {
  const cpu = (Math.random() * 100).toFixed(1);
  const mem = (Math.random() * 100).toFixed(1);
  const threat = ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)];

  cpuGauge.innerHTML = `💻 CPU Usage: <b>${cpu}%</b>`;
  memoryGauge.innerHTML = `🧠 Memory Usage: <b>${mem}%</b>`;
  threatGauge.innerHTML = `🚦 Threat Level: <b>${threat}</b>`;
}

setInterval(updateGauges, 5000);
