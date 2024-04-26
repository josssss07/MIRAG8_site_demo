

const wrapper = document.querySelectorAll(".wrapper");
const carousel = document.querySelectorAll(".carousel");
const firstCardWidth = carousel[0].querySelector(".card").offsetWidth;
const carouselChildrens = [];
for (let i = 0; i < carousel.length; i++) {
  carouselChildrens.push([...carousel[i].children]);
}
let i = 0;

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = 1//Math.round(carousel[0].offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.forEach(function (element) {
  element
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel[i].insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  i++;
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
i = 0;
carouselChildrens.forEach(function (element) {
  element.slice(0, cardPerView).forEach((card) => {
    carousel[i].insertAdjacentHTML("beforeend", card.outerHTML);
  });
  i++;
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
for (let i = 0; i < carousel.length; i++) {
  carousel[i].classList.add("no-transition");
  carousel[i].scrollLeft = carousel[i].offsetWidth;
  carousel[i].classList.remove("no-transition");
}

// Add event listeners for the arrow buttons to scroll the carousel left and right

const dragStart = function (e) {
  isDragging = true;
  this.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = this.scrollLeft;
};

const dragging = function (e) {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement\
  this.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = function () {
  isDragging = false;
  this.classList.remove("dragging");
};

const infiniteScroll = function () {
  // If the carousel is at the beginning, scroll to the end
  if (this.scrollLeft === 0) {
    this.classList.add("no-transition");
    this.scrollLeft = this.scrollWidth - 2 * this.offsetWidth;
    this.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(this.scrollLeft) === this.scrollWidth - this.offsetWidth) {
    this.classList.add("no-transition");
    this.scrollLeft = this.offsetWidth;
    this.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  autoPlay();
};


let index=0;
function scrollCarousel() {
  if(carousel!=undefined){
  carousel[index].scrollLeft += firstCardWidth;
  index++;
  
  if (index === carousel.length) {
    index = 0;
  }}}

const autoPlay = function () {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms

  timeoutId = setTimeout(scrollCarousel, 2500);


};


carousel.forEach(function (carousal) {
  carousal.addEventListener("mousedown", dragStart);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("mousemove", dragging);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("mouseup", dragStop);
});
carousel.forEach(function (carousel) {
  carousel.addEventListener("scroll", infiniteScroll);
});
wrapper.forEach(function (wrapper) {
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
});

