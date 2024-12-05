//Funktion för att skicka vidare användaren efter 10 sekunder
function redirectAfterDelay() {
    setTimeout(() => {
      window.location.href = "main.html"; // Skickar vidare användaren till main.html
    }, 10000); // Väntar 10 sekunder
  }

  // Starta funktionen när sidan laddats
  document.addEventListener("DOMContentLoaded", redirectAfterDelay);

  // Array med citat som ska visas random på index.html
const quotes = [
    "“Houston, Tranquillity Base here. The Eagle has landed.” - Neil Armstrong",
    "“Somewhere, something incredible is waiting to be known.” - Sharon Begley",
    "“The universe is a pretty big place. If it’s just us, seems like an awful waste of space.” - Carl Sagan",
    "“Space is big. You just won´t believe how vastly, hugely, mind-bogglingly big it is” - Douglas Adams",
    "“The Earth is the cradle of Humanity. But one doesn't always live in the cradle.” - Konstantin Tsiolkovsky"
];

// Funktion för att slumpa citat ur array quotes
function randomQuotes() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Visa citat på sidan.
function updateRandomQuote() {
    const randomElement = document.getElementById("random-quote");
    const randomQuote = randomQuotes();
    randomElement.textContent = randomQuote;
}

// Kör funktionen en gång vid sidladdning
updateRandomQuote();