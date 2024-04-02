const wrapper = document.querySelectorAll(".wrapper");
const carousel = document.querySelectorAll(".carousel");
const firstCardWidth = carousel[0].querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
let carouselChildrens = [];
for (let i = 0; i < carousel.clientHeight; i++) {
  carouselChildrens.push(
    carousel.forEach((carousel) => [...carousel.children])
  );
  console.log(carouselChildrens);
}

let isDragging = false,
  startX,
  startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel[0].offsetWidth / firstCardWidth);


// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.forEach((carouselChildrens) =>
  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    })
);

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.forEach((e) =>
  e.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  })
);

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.forEach((e) => e.classList.add("no-transition"));
for (let i = 0; i < carousel.length; i++) {
  carousel.scrollLeft = carousel.offsetWidth;
}
carousel.forEach((e) => e.classList.remove("no-transition"));

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let carousel = this.parentNode.children[1];
    carousel.scrollLeft += this.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  let carousel = this.parentNode.children[1];
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = function (e) {
  let carousel = this.parentNode.children[1];
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = function () {
  let carousel = this.parentNode.children[1];
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = function () {
  let carousel = this.parentNode.children[1];
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
};

carousel.forEach(function (e) {
  e.addEventListener("mousedown", dragStart);
});
carousel.forEach(function (e) {
  e.addEventListener("mousemove", dragging);
});
carousel.forEach(function (e) {
  e.addEventListener("mouseup", dragStop);
});
carousel.forEach(function (e) {
  e.addEventListener("scroll", infiniteScroll);
});
