/* =========================================================
   TUA CONTABILIDADE — JavaScript
   1. Anima as seções quando entram na tela
   2. Controla o carrossel de clientes
   ========================================================= */


/* -------------------- SCROLL REVEAL -------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach((element) => revealObserver.observe(element));


/* -------------------- CARROSSEL -------------------- */

const carousel = document.querySelector(".carousel");

if (carousel) {
    const track = carousel.querySelector(".carousel__track");
    const slides = Array.from(carousel.querySelectorAll(".testimonial"));
    const previousButton = carousel.querySelector(".carousel__button--prev");
    const nextButton = carousel.querySelector(".carousel__button--next");
    const dotsContainer = carousel.querySelector(".carousel__dots");

    let currentIndex = 0;

    // Cria as bolinhas automaticamente de acordo com a quantidade de clientes.
    slides.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.className = "carousel__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Ir para o cliente ${index + 1}`);

        dot.addEventListener("click", () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(
        dotsContainer.querySelectorAll(".carousel__dot")
    );

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === currentIndex);
        });

        previousButton.disabled = slides.length <= 1;
        nextButton.disabled = slides.length <= 1;
    }

    function goToSlide(index) {
        if (slides.length === 0) return;

        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    }

    previousButton.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
    });

    // Permite trocar de cliente arrastando no celular.
    let startX = 0;
    let endX = 0;

    carousel.addEventListener(
        "touchstart",
        (event) => {
            startX = event.touches[0].clientX;
        },
        { passive: true }
    );

    carousel.addEventListener(
        "touchend",
        (event) => {
            endX = event.changedTouches[0].clientX;

            const distance = endX - startX;

            if (Math.abs(distance) < 45) return;

            if (distance < 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        },
        { passive: true }
    );

    // Teclas de seta no computador.
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            goToSlide(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            goToSlide(currentIndex + 1);
        }
    });

    updateCarousel();
}
