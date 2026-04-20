const width = 800, height = 500;
const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load world map data (simplified)
const countries = [
    { name: "USA", coords: [100, 100] },
    { name: "China", coords: [500, 150] },
    { name: "Russia", coords: [400, 100] },
    { name: "India", coords: [450, 250] },
    { name: "Brazil", coords: [200, 350] },
];

// Draw fake countries
svg.selectAll(".country")
    .data(countries)
    .enter()
    .append("circle")
    .attr("class", "country")
    .attr("cx", d => d.coords[0])
    .attr("cy", d => d.coords[1])
    .attr("r", 30);

// Array of possible simulated attack types
const attackTypes = ["SQL Injection", "Brute Force", "Malware Upload", "DDoS attempt"];

async function triggerSimulatedAttack() {
    const target = countries[Math.floor(Math.random() * countries.length)];
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];

    // Add attack animation on the map
    svg.append("circle")
        .attr("class", "attack")
        .attr("cx", target.coords[0])
        .attr("cy", target.coords[1])
        .attr("r", 5)
        .transition()
        .duration(1000)
        .attr("r", 20)
        .remove();

    try {
        const response = await fetch('http://127.0.0.1:5001/simulate_attack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ attack_type: attackType })
        });

        if (response.ok) {
            // Log the attack on the map screen locally
            const log = document.getElementById("attack-log");
            log.innerHTML += `[${new Date().toLocaleTimeString()}] ⚡ ${attackType} originated near ${target.name}<br>`;
            log.scrollTop = log.scrollHeight;
        }
    } catch (error) {
        console.error("Error simulating attack:", error);
    }
}

// Simulate random attacks hitting the backend
setInterval(triggerSimulatedAttack, 4000);