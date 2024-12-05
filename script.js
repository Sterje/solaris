fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
    method: 'GET',
    headers: { 'x-zocom': 'solaris-qqO7Lv5Hg29t5hqI' } // Nyckel och user för att ansluta till API
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunde inte ansluta till API");
        }
        return response.json(); // Omvandlar svar till JSON om lyckad anslutning
    })
    .then(data => {
        console.log("Data: ", data); // Visar API-innehållet i konsolen

        // Funktion för att söka efter planet i API
        function searchPlanet() {
            const planetName = document.getElementById('searchInput').value.toLowerCase();

            // Hitta planetdata via .find
            const planetData = data.bodies.find(planet => planet.name.toLowerCase() === planetName);

            if (planetData) {
                // Skapa URL med query parameters
                const queryParams = new URLSearchParams({
                    name: planetData.name,
                    latinName: planetData.latinName,
                    desc: planetData.desc,
                    circumference: planetData.circumference,
                    distance: planetData.distance,
                    maxTemp: planetData.temp.day,
                    minTemp: planetData.temp.night,
                    moons: planetData.moons.length,
                    rotation: planetData.rotation,
                    orbitalPeriod: planetData.orbitalPeriod,
                });

                // Öppna ny sida med planetens information
                window.location.href = `planet.html?${queryParams.toString()}`;
            } else {
                alert('Himlakroppen kunde inte hittas i detta solsystem');
            }
        }

        // Eventlistener för sökknappen för att köra searchPlanet
        const planetBtn = document.getElementById("searchButton");
        planetBtn.addEventListener("click", searchPlanet);
    })
    .catch(error => console.error("Error:", error));

// Körs när sidan laddats klart
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Sätter information från URL till element på sidan
    document.getElementById('name').textContent = params.get('name');
    document.getElementById('latinName').textContent = params.get('latinName');
    document.getElementById('facts').textContent = params.get('desc');
    document.getElementById('circumference').textContent = params.get('circumference');
    document.getElementById('distanceToSun').textContent = params.get('distance');
    document.getElementById('maxTemp').textContent = params.get('maxTemp');
    document.getElementById('minTemp').textContent = params.get('minTemp');
    document.getElementById('moons').textContent = params.get('moons');
    document.getElementById('rotation').textContent = params.get('rotation');
    document.getElementById('orbitalPeriod').textContent = params.get('orbitalPeriod');
});

// Funktion för att visa slumpmässig sektion
function randomSection() {
    const sections = document.querySelectorAll('.random-section');
    const randomIndex = Math.floor(Math.random() * sections.length);
    sections[randomIndex].style.display = 'block';
}
// randomSection();
