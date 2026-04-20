const logsList = document.getElementById('logs-list');

// Function to add log entries to the logs list
function generateLog(logMessage, timestamp) {
    if (!timestamp) {
        timestamp = new Date().toLocaleTimeString();
    }
    const logItem = document.createElement('li');
    logItem.innerHTML = `<span>[${timestamp}]</span> ${logMessage}`;
    logsList.prepend(logItem); // Add to the top
}

// Fetch logs from the backend API
async function fetchLogs() {
    try {
        const response = await fetch('http://127.0.0.1:5001/logs');
        if (response.ok) {
            const logs = await response.json();
            logsList.innerHTML = ''; // Clear existing logs
            logs.forEach(log => {
                const time = new Date(log.timestamp).toLocaleTimeString();
                generateLog(`IP: ${log.ip_address} - Attack: ${log.attack_type} - Payload: ${log.payload || 'None'} - Severity: ${log.severity}`, time);
            });
        }
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

// Poll backend for new logs every 5 seconds
setInterval(fetchLogs, 5000);

// Fetch initially on page load
window.onload = () => {
    fetchLogs();
};
