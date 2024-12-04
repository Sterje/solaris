fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", { //Funktion för att ansluta till API
    method: 'GET',
    headers: {'x-zocom': 'solaris-qqO7Lv5Hg29t5hqI'} // Nyckel och user som behövs för att ansluta till API
})
    .then(response => {

        if(!response.ok){ //Felmeddelande om något går fel vid anslutning
            throw new Error("Kunde inte ansluta till API")
            }
            return response.json() //Om anslutning lyckas, omvandlas svar från API till json
        })

        .then(data => { //Visar innehållet i API i console
            console.log("Data: ", data)
            //Funktion för att söka efter planet i API.
            function searchPlanet() { 
                // Hämtar input från sökfältet, gör om till lowercase för att användaren ska kunna använda både stora och små bokstäver
                const planetName = document.getElementById('searchInput').value.toLowerCase();
            
                // Kontrollerar om planet finns. Här hade jag först en rad if else för varje planet som fungerade men kändes som onödigt mycket kod.
                // Istället används .find funktionen som söker i data efter planet, här tog jag hjälp av AI och 
                const planetData = data.bodies.find(planet => planet.name.toLowerCase() === planetName);
            
                if (planetData) {
                    // Gör en url av planetdata.
                    const queryParams = new URLSearchParams({
                        name: planetData.name,
                        latinName: planetData.latinName,
                        desc: planetData.desc,
                        circumference: planetData.circumference,
                        distance: planetData.distance,
                        maxTemp: planetData.temp.day,
                        minTemp: planetData.temp.night,
                        moons: planetData.moons.length,
                    });
            
                    // Öppnar en ny sida för att visa info om planet
                    window.location.href = `planet.html?${queryParams.toString()}`;
                // Om planet inte finns i API får användaren detta meddelande
                } else {
                    alert('Himlakroppen kunde inte hittas i detta solsystem');
                }
                
            }
            // Eventlistener som lyssnar efter klick på sök knappen, då körs funktionen searchPlanet för att söka
            const planetBtn = document.getElementById("searchButton");
            planetBtn.addEventListener("click", searchPlanet);
        });


        document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);

            // Skriver ut informationen från API till planet.html sidan.
            document.getElementById('name').textContent = params.get('name');
            document.getElementById('latinName').textContent = params.get('latinName');
            document.getElementById('facts').textContent = params.get('desc');
            document.getElementById('circumference').textContent = params.get('circumference');
            document.getElementById('distanceToSun').textContent = params.get('distance');
            document.getElementById('maxTemp').textContent = params.get('maxTemp');
            document.getElementById('minTemp').textContent = params.get('minTemp');
            document.getElementById('moons').textContent = params.get('moons');
        });

        const quotes = ["“Houston, Tranquillity Base here. The Eagle has landed.” - Neil Armstrong",
                        "“Somewhere, something incredible is waiting to be known.” - Sharon Begley",
                        "“The universe is a pretty big place. If it’s just us, seems like an awful waste of space.” - Carl Sagan",
                        "“Space is big. You just won´t believe how vastly, hugely, mind-boggingly big it is” - Douglas Adams"
                        

        ];


        

        // Funktion för att hämta ett slumpmässigt citat
        function randomQuotes() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }

        // Funktion för att uppdatera innehållet på sidan
        function updateRandomQuote() {
            const randomElement = document.getElementById("random-quote");
            const randomQuote = randomQuotes();
            randomElement.textContent = randomQuote;
        }

        // Kör funktionen en gång vid sidladdning
        updateRandomQuote();

        

// function randomSection() {

// const sections = document.querySelectorAll('.random-section');

// const randomIndex = Math.floor(Math.random() * sections.length);

// sections[randomIndex].style.display = 'block';

// }
// randomSection();