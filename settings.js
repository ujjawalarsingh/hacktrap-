// Event Listener for the Threat Level Range Input
const thresholdInput = document.getElementById('threat-threshold');
const thresholdValue = document.getElementById('threat-threshold-value');

// Update the displayed threshold value as the range input changes
thresholdInput.addEventListener('input', () => {
    thresholdValue.textContent = thresholdInput.value;
});

// Handle form submission
const settingsForm = document.getElementById('settings-form');
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form values
    const threatThreshold = thresholdInput.value;
    const alertEnabled = document.getElementById('alert-toggle').checked;
    const logLevel = document.getElementById('log-level').value;

    // Save settings to local storage (for now, can be used to simulate persistence)
    localStorage.setItem('threat-threshold', threatThreshold);
    localStorage.setItem('alerts-enabled', alertEnabled);
    localStorage.setItem('log-level', logLevel);

    // Confirmation message
    alert('Settings saved successfully!');
});

// Load saved settings (if any)
window.onload = () => {
    const savedThreshold = localStorage.getItem('threat-threshold');
    const savedAlerts = localStorage.getItem('alerts-enabled');
    const savedLogLevel = localStorage.getItem('log-level');

    if (savedThreshold) thresholdInput.value = savedThreshold;
    if (savedAlerts) document.getElementById('alert-toggle').checked = savedAlerts === 'true';
    if (savedLogLevel) document.getElementById('log-level').value = savedLogLevel;

    thresholdValue.textContent = thresholdInput.value; // Update the initial threshold value
};
