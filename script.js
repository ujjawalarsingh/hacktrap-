// Global stats
let totalAttacks = 0;
let totalHackers = 0;

// Fetch threat level
async function fetchThreatLevel() {
    try {
        const response = await fetch('http://127.0.0.1:5001/threat_level');
        if (response.ok) {
            const data = await response.json();
            
            // Update Text
            document.getElementById('threat').textContent = data.category;
            
            // Update Gauge
            const threatGauge = document.getElementById('threat-fill');
            const threatStatus = document.getElementById('threat-status');
            
            if (data.category === 'High') {
                threatGauge.style.background = 'red';
                threatGauge.style.height = '90%';
                threatStatus.textContent = 'High';
            } else if (data.category === 'Medium') {
                threatGauge.style.background = 'orange';
                threatGauge.style.height = '50%';
                threatStatus.textContent = 'Medium';
            } else {
                threatGauge.style.background = 'green';
                threatGauge.style.height = '20%';
                threatStatus.textContent = 'Low';
            }
        }
    } catch (error) {
        console.error("Error fetching threat level:", error);
    }
}

// Fetch threat feed and logs
async function fetchThreatFeed() {
    try {
        const response = await fetch('http://127.0.0.1:5001/threat_feed');
        if (response.ok) {
            const attacks = await response.json();
            
            // Update Stats
            if (attacks.length > totalAttacks) {
                totalAttacks = attacks.length;
                totalHackers = new Set(attacks.map(a => a.ip_address)).size;
                
                document.getElementById('attacks').textContent = totalAttacks * 13; // Fake multiplier for demo
                document.getElementById('hackers').textContent = totalHackers;
            }
            
            // Update Threat Feed UI
            const feedContainer = document.getElementById('threat-feed');
            feedContainer.innerHTML = ''; // Clear
            
            const logsContainer = document.getElementById('logs');
            logsContainer.innerHTML = ''; // Clear mini logs
            
            attacks.forEach(attack => {
                // Feed Item
                const feedItem = document.createElement("div");
                feedItem.className = "feed-item";
                feedItem.innerHTML = `<p>[${attack.severity}] Alert: ${attack.attack_type} detected from ${attack.ip_address}.</p>`;
                feedContainer.appendChild(feedItem);
                
                // Log Item
                const logEntry = document.createElement("li");
                const time = new Date(attack.timestamp).toLocaleTimeString();
                logEntry.textContent = `[${time}] ⚠️ ${attack.attack_type} from ${attack.ip_address}`;
                logsContainer.appendChild(logEntry);
            });
            
        }
    } catch (error) {
        console.error("Error fetching threat feed:", error);
    }
}

// System Health Simulation (CPU/Memory aren't in python backend yet)
setInterval(() => {
    document.getElementById('cpu-fill').style.height = `${Math.floor(Math.random() * 40) + 20}%`;
    document.getElementById('cpu-status').textContent = 'Stable';
    
    document.getElementById('memory-fill').style.height = `${Math.floor(Math.random() * 30) + 40}%`;
    document.getElementById('memory-status').textContent = 'Optimal';
}, 3000);

// Polling
setInterval(() => {
    fetchThreatLevel();
    fetchThreatFeed();
}, 2000);

// Init
window.onload = () => {
    fetchThreatLevel();
    fetchThreatFeed();
};