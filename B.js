const track = document.querySelector(".carousel-track");
let items = Array.from(document.querySelectorAll(".carousel-item"));
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Séparer les photos et la vidéo
const photos = items.filter(el => el.tagName === "IMG");
const video = items.find(el => el.tagName === "VIDEO");

// Cloner uniquement les photos pour boucle infinie
const firstClone = photos[0].cloneNode(true);
const lastClone = photos[photos.length - 1].cloneNode(true);

track.insertBefore(lastClone, photos[0]);
track.appendChild(firstClone);

items = Array.from(document.querySelectorAll(".carousel-item"));
let index = 1; // commence sur la première vraie photo

updateCarousel();

// Fonction pour centrer image/vidéo active
function updateCarousel(instant = false) {
  const style = window.getComputedStyle(items[0]);
  const totalWidth = items[0].offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);

  if (instant) track.style.transition = "none";
  else track.style.transition = "transform 0.5s ease";

  const containerWidth = document.querySelector(".carousel").offsetWidth;
  const activeOffset = items[index].offsetLeft + items[index].offsetWidth / 2;
  const translateX = activeOffset - containerWidth / 2;
  track.style.transform = `translateX(-${translateX}px)`;

  items.forEach((el, i) => {
    if (i === index) {
      el.classList.add("active");
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
      if (el.tagName === "VIDEO") el.play();
    } else {
      el.classList.remove("active");
      el.style.opacity = "0.4";
      el.style.transform = "scale(0.8)";
      if (el.tagName === "VIDEO") el.pause();
    }
  });
}

// NEXT
nextBtn.addEventListener("click", () => {
  index++;
  updateCarousel();
  // si clone de la première photo
  if (index === items.length - 1) {
    setTimeout(() => {
      index = 1;
      updateCarousel(true);
    }, 500);
  }
});

// PREV
prevBtn.addEventListener("click", () => {
  index--;
  updateCarousel();
  // si clone de la dernière photo
  if (index === 0) {
    setTimeout(() => {
      index = items.length - 2;
      updateCarousel(true);
    }, 500);
  }
});
