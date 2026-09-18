const slides = document.querySelectorAll(".slide");
const currentNumber = document.getElementById("current");
const progressBar = document.getElementById("progressBar");

let currentSlide = 0;
let isAnimating = false;

function updateSlide(newIndex, direction = 1) {

    if (isAnimating) return;
    if (newIndex < 0 || newIndex >= slides.length) return;
    if (newIndex === currentSlide) return;

    isAnimating = true;

    const oldSlide = slides[currentSlide];
    const newSlide = slides[newIndex];

    oldSlide.classList.remove("active");

    if (direction > 0) {
        oldSlide.classList.add("previous");
        newSlide.style.transform = "translateX(45px)";
    } else {
        oldSlide.classList.remove("previous");
        newSlide.style.transform = "translateX(-45px)";
    }

    newSlide.classList.add("active");

    requestAnimationFrame(() => {
        newSlide.style.transform = "translateX(0)";
    });

    currentSlide = newIndex;

    updateProgress();

    setTimeout(() => {
        oldSlide.classList.remove("previous");
        newSlide.style.transform = "";
        isAnimating = false;
    }, 700);
}


function nextSlide() {
    if (currentSlide < slides.length - 1) {
        updateSlide(currentSlide + 1, 1);
    }
}


function previousSlide() {
    if (currentSlide > 0) {
        updateSlide(currentSlide - 1, -1);
    }
}


function goToStart() {
    if (currentSlide !== 0) {
        updateSlide(0, -1);
    }
}


function goToEnd() {
    if (currentSlide !== slides.length - 1) {
        updateSlide(slides.length - 1, 1);
    }
}


function restart() {
    if (currentSlide === 0) return;

    slides.forEach(slide => {
        slide.classList.remove("active", "previous");
        slide.style.transform = "";
    });

    currentSlide = 0;

    slides[0].classList.add("active");

    updateProgress();
}


function updateProgress() {

    const number = String(currentSlide + 1).padStart(2, "0");

    currentNumber.textContent = number;

    const percentage =
        ((currentSlide + 1) / slides.length) * 100;

    progressBar.style.width = `${percentage}%`;
}


/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener("keydown", (event) => {

    switch (event.key) {

        case "ArrowRight":
        case "ArrowDown":
        case "Enter":
        case " ":
            event.preventDefault();
            nextSlide();
            break;

        case "ArrowLeft":
        case "ArrowUp":
            event.preventDefault();
            previousSlide();
            break;

        case "Home":
            event.preventDefault();
            goToStart();
            break;

        case "End":
            event.preventDefault();
            goToEnd();
            break;

        case "r":
        case "R":
            event.preventDefault();
            restart();
            break;
    }
});


/* =========================
   MOUSE WHEEL
   tetap tersedia, tetapi
   keyboard menjadi kontrol utama
========================= */

let wheelCooldown = false;

document.addEventListener("wheel", (event) => {

    if (wheelCooldown) return;

    wheelCooldown = true;

    if (event.deltaY > 0) {
        nextSlide();
    } else {
        previousSlide();
    }

    setTimeout(() => {
        wheelCooldown = false;
    }, 800);
});


/* =========================
   INITIALIZE
========================= */

updateProgress();
// ===============================
// SWIPE UNTUK HP
// ===============================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    // Swipe kiri → slide berikutnya
    if (swipeDistance < -50) {
        nextSlide();
    }

    // Swipe kanan → slide sebelumnya
    if (swipeDistance > 50) {
        prevSlide();
    }
}
