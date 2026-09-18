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
// TOMBOL NAVIGASI HP

const navButtons = document.createElement("div");
navButtons.innerHTML = `
    <button id="prevBtn">←</button>
    <button id="nextBtn">→</button>
`;

document.body.appendChild(navButtons);

const buttonStyle = document.createElement("style");
buttonStyle.innerHTML = `
    #prevBtn, #nextBtn {
        position: fixed;
        bottom: 25px;
        width: 48px;
        height: 48px;
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 50%;
        background: rgba(20,20,20,0.8);
        color: white;
        font-size: 22px;
        cursor: pointer;
        z-index: 9999;
        backdrop-filter: blur(8px);
    }

    #prevBtn {
        left: 25px;
    }

    #nextBtn {
        right: 25px;
    }

    #prevBtn:active, #nextBtn:active {
        transform: scale(0.9);
    }
`;

document.head.appendChild(buttonStyle);

document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);
