function redirectAfterDelay() {
    setTimeout(() => {
      // Omdirigera till en annan sida
      window.location.href = "main.html"; // Byt till din målsida
    }, 20000); // 5000 millisekunder = 5 sekunder
  }

  // Starta funktionen när sidan laddas
  document.addEventListener("DOMContentLoaded", redirectAfterDelay);