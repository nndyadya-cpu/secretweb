const slides = document.querySelectorAll(".slide");

const currentNumber = document.getElementById("current");
const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let isAnimating = false;


/* =========================
   PINDAH SLIDE
========================= */

function showSlide(index, direction) {

    if (isAnimating) return;

    if (index < 0 || index >= slides.length) return;

    if (index === currentSlide) return;

    isAnimating = true;

    const oldSlide = slides[currentSlide];
    const newSlide = slides[index];

    oldSlide.classList.remove("active");
    oldSlide.classList.remove("previous");

    if (direction === "prev") {
        newSlide.classList.add("previous");
    } else {
        newSlide.classList.remove("previous");
    }

    newSlide.classList.add("active");

    currentSlide = index;

    updateProgress();
    updateButtons();

    setTimeout(function() {
        isAnimating = false;
    }, 650);
}


/* =========================
   NEXT
========================= */

function nextSlide() {

    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1, "next");
    }
}


/* =========================
   BACK
========================= */

function previousSlide() {

    if (currentSlide > 0) {
        showSlide(currentSlide - 1, "prev");
    }
}


/* =========================
   TOMBOL
========================= */

nextBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    nextSlide();

});


prevBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    previousSlide();

});


/* =========================
   TAMPILKAN TOMBOL
========================= */

function updateButtons() {

    /* SLIDE 1 */

    if (currentSlide === 0) {

        prevBtn.classList.add("hidden");

        nextBtn.classList.remove("hidden");

    }

    /* SLIDE TERAKHIR */
    else if (currentSlide === slides.length - 1) {

        prevBtn.classList.remove("hidden");

        nextBtn.classList.add("hidden");

    }

    /* SLIDE TENGAH */
    else {

        prevBtn.classList.remove("hidden");

        nextBtn.classList.remove("hidden");

    }
}


/* =========================
   PROGRESS BAR
========================= */

function updateProgress() {

    const number = currentSlide + 1;

    currentNumber.textContent =
        String(number).padStart(2, "0");


    const percentage =
        (number / slides.length) * 100;


    progressBar.style.width =
        percentage + "%";
}


/* =========================
   KEYBOARD
========================= */

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

        previousSlide();

    }


    if (event.key === "Home") {

        event.preventDefault();

        if (currentSlide !== 0) {
            showSlide(0, "prev");
        }

    }


    if (event.key === "End") {

        event.preventDefault();

        if (currentSlide !== slides.length - 1) {
            showSlide(slides.length - 1, "next");
        }

    }


    if (event.key.toLowerCase() === "r") {

        event.preventDefault();

        if (currentSlide !== 0) {
            showSlide(0, "prev");
        }

    }

});


/* =========================
   SWIPE HP
========================= */

let startX = 0;
let startY = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        startX =
            event.changedTouches[0].screenX;

        startY =
            event.changedTouches[0].screenY;

    }, {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function(event) {

        const endX =
            event.changedTouches[0].screenX;

        const endY =
            event.changedTouches[0].screenY;


        const distanceX =
            endX - startX;

        const distanceY =
            endY - startY;


        /* Abaikan swipe vertikal */

        if (
            Math.abs(distanceX) <
            Math.abs(distanceY)
        ) {
            return;
        }


        /* Swipe terlalu pendek */

        if (
            Math.abs(distanceX) < 60
        ) {
            return;
        }


        /* Geser kiri = NEXT */

        if (distanceX < 0) {

            nextSlide();

        }


        /* Geser kanan = BACK */
        else {

            previousSlide();

        }

    }, {
        passive: true
    }
);


/* =========================
   MOUSE WHEEL
========================= */

let wheelLocked = false;


document.addEventListener(
    "wheel",
    function(event) {

        if (wheelLocked) return;

        wheelLocked = true;


        if (event.deltaY > 0) {

            nextSlide();

        } else if (event.deltaY < 0) {

            previousSlide();

        }


        setTimeout(function() {

            wheelLocked = false;

        }, 700);

    }, {
        passive: true
    }
);


/* =========================
   MULAI
========================= */

updateProgress();
updateButtons();
