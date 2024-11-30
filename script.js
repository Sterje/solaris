function randomSection() {

const sections = document.querySelectorAll('.random-section');

const randomIndex = Math.floor(Math.random() * sections.length);

sections[randomIndex].style.display = 'block';

}
randomSection();