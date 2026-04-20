function scanFile() {
    const fileInput = document.getElementById("file-upload");
    const resultDiv = document.getElementById("result");

    if (!fileInput.files[0]) {
        resultDiv.innerHTML = "❌ No file selected!";
        return;
    }

    const file = fileInput.files[0];
    resultDiv.innerHTML = "🔍 Scanning...";

    const reader = new FileReader();
    reader.onload = function () {
        const content = reader.result;

        // Check if the content matches EICAR test string
        const eicarSignature = "X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*";

        setTimeout(() => {
            if (content.includes(eicarSignature)) {
                resultDiv.innerHTML = `
                    🚨 <span class="danger">THREAT DETECTED!</span><br>
                    File: <strong>${file.name}</strong><br>
                    Type: EICAR.Test.Trojan.Simulated<br>
                    Action: <button onclick="quarantine()">Quarantine</button>
                `;
            } else {
                resultDiv.innerHTML = `
                    ✅ <span class="safe">File is clean!</span><br>
                    File: <strong>${file.name}</strong><br>
                    Scan time: ${Math.floor(Math.random() * 5) + 1} seconds
                `;
            }
        }, 2000);
    };

    reader.readAsText(file); // Read file as text for scanning
}

function quarantine() {
    document.getElementById("result").innerHTML += "<br>🗑️ File quarantined!";

}