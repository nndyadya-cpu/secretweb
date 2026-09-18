// ==============================
// TOMBOL NAVIGASI
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

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);


// ==============================
// ATUR TOMBOL SESUAI SLIDE
// ==============================

function updateButtons() {

    // Slide pertama
    if (currentSlide === 0) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "block";
    }

    // Slide terakhir
    else if (currentSlide === slides.length - 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "none";
    }

    // Slide tengah
    else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    }
}
