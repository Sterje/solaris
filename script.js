const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies';
const apiKeyUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys';

//Hämtar API nyckel från adressen i apiKeyUrl
fetch(apiKeyUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Viktigt att inkludera rätt content-type
    }
})

.then(response => {
    if (!response.ok) {
        throw new Error('API-key not found');
    }
    return response.json(); // Returnera JSON-data från svaret
})
.then(data => {
    //Sparar nyckeln i apiKey
    const apiKey = data.key;
    // Nu har vi nyckel och använder den i våran GET
    return fetch(apiUrl, {
        method: 'GET',
        headers: { 'x-zocom': apiKey }
    })
})

    .then(response => {
        if (!response.ok) { // Om anslutning inte lyckas händer detta:
            throw new Error("Kunde inte ansluta till API");
        }
        return response.json(); // Om anslutning lyckas omvandlas datan i API till json.
    })
    .then(data => {
        // Funktion för att söka efter planet i API
        function searchPlanet() {
            const planetName = document.getElementById('searchInput').value.toLowerCase();

            // Hitta planetdata med .find, här använde jag först ett gäng if else satser för
            //varje planet som fungerade men tänkte att det borde finnas enklare sätt. Hittade .find metoden på w3schools
            //och efter en hel del pill med både AI och utan fick jag det att fungera.
            const planetData = data.bodies.find(planet => planet.name.toLowerCase() === planetName);

            if (planetData) {
                // Skapar URL med query parameters, hittade denna lösning på Stack Overflow, här har jag behövt
                // läsa på vad som händer och fortfarande är det lite luddigt för mig.
                // En annan lösning hade varit att koppla med typ const name = document.getElementById('name') till en
                // section som har display: none som default
                // sen uppdatera name.textContent = planetData.name
                // och köra display: flex för att visa section som en "popup".
            
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
