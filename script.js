const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let isAnimating = false;

// ==============================
// TAMPILKAN SLIDE
// ==============================

function showSlide(index) {
    if (isAnimating) return;

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    if (index === currentSlide) return;

    isAnimating = true;

    slides[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");

    updateCounter();

    setTimeout(() => {
        isAnimating = false;
    }, 700);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}


// ==============================
// TOMBOL ← →
// ==============================

const navigation = document.createElement("div");

navigation.innerHTML = `
    <button id="prevBtn">←</button>
    <button id="nextBtn">→</button>
`;

document.body.appendChild(navigation);

const style = document.createElement("style");

style.textContent = `
    #prevBtn,
    #nextBtn {
        position: fixed;
        bottom: 30px;

        width: 48px;
        height: 48px;

        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.2);

        background: rgba(10,10,10,0.75);
        color: #e8e1dd;

        font-size: 20px;
        font-family: sans-serif;
        font-weight: 300;

        cursor: pointer;
        z-index: 9999;

        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        transition: 0.25s ease;
    }

    #prevBtn {
        left: 25px;
    }

    #nextBtn {
        right: 25px;
    }

    #prevBtn:hover,
    #nextBtn:hover {
        background: rgba(255,255,255,0.08);
        border-color: rgba(255,255,255,0.4);
        transform: scale(1.08);
    }

    #prevBtn:active,
    #nextBtn:active {
        transform: scale(0.9);
    }

    @media (max-width: 600px) {
        #prevBtn,
        #nextBtn {
            width: 48px;
            height: 48px;
            bottom: 22px;
        }

        #prevBtn {
            left: 20px;
        }

        #nextBtn {
            right: 20px;
        }
    }
`;

document.head.appendChild(style);

document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);


// ==============================
// COUNTER SLIDE
// ==============================

function updateCounter() {
    const counter = document.querySelector("#currentSlide, #current");

    if (counter) {
        counter.textContent =
            String(currentSlide + 1).padStart(2, "0");
    }
}


// ==============================
// KEYBOARD
// ==============================

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "Enter" ||
        event.key === " "
    ) {
        event.preventDefault();
        nextSlide();
    }

    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
    ) {
        event.preventDefault();
        prevSlide();
    }

    if (event.key === "Home") {
        showSlide(0);
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }

    if (event.key.toLowerCase() === "r") {
        showSlide(0);
    }
});


// ==============================
// SWIPE HP
// ==============================

let touchStartX = 0;

document.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", function(event) {

    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 60) return;

    if (distance < 0) {
        nextSlide();
    } else {
        prevSlide();
    }

}, { passive: true });


// ==============================
// MOUSE WHEEL
// ==============================

let wheelCooldown = false;

document.addEventListener("wheel", function(event) {

    if (wheelCooldown) return;

    wheelCooldown = true;

    if (event.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }

    setTimeout(() => {
        wheelCooldown = false;
    }, 700);

}, { passive: true });
