const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }
    });
});

// başlangıç state
cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease";
});

const visiblePhotos = document.querySelectorAll(".photo");
const hiddenPhotos = document.querySelectorAll("#hiddenGallery img");

const photos = [
    ...visiblePhotos,
    ...hiddenPhotos
];

const lightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevPhoto");
const nextBtn = document.getElementById("nextPhoto");

let currentPhotoIndex = 0;

photos.forEach((photo, index) => {
    photo.addEventListener("click", () => {
        currentPhotoIndex = index;
        lightboxImage.src = photo.src;
        lightbox.classList.add("active");
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    lightboxImage.src = photos[currentPhotoIndex].src;
});

prevBtn.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    lightboxImage.src = photos[currentPhotoIndex].src;
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        lightboxImage.src = photos[currentPhotoIndex].src;
    }

    if (event.key === "ArrowLeft") {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        lightboxImage.src = photos[currentPhotoIndex].src;
    }

    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }
});