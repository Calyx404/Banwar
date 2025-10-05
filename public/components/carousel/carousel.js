export class Carousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.slides = [];
    this.current = 0;
    this.interval = options.interval || 5000;
    this.autoplay = options.autoplay ?? true;
    this.timer = null;
    this.onChange = options.onChange || (() => {});
  }

  init(data, onChangeCallback) {
    this.onChange = onChangeCallback || this.onChange;
    this.slides = Object.keys(data);

    if (!this.container) {
      console.error("[Carousel] Container not found:", containerSelector);
      return;
    }

    // Build slide elements
    this.container.classList.add("carousel");
    this.container.innerHTML = `
      <div class="carousel-track">
        ${this.slides
          .map(
            (key, i) => `
          <div class="carousel-slide" data-index="${i}">
            <img class="icon" src="./assets/icons/${data[key].icon}" alt="${key}">
            <h2>${key}</h2>
          </div>`
          )
          .join("")}
      </div>
      <div class="carousel-nav">
        <button class="carousel-prev"><img src="./assets/icons/left.svg" alt="Prev"></button>
        <button class="carousel-next"><img src="./assets/icons/right.svg" alt="Next"></button>
      </div>
    `;

    this.track = this.container.querySelector(".carousel-track");
    this.prevBtn = this.container.querySelector(".carousel-prev");
    this.nextBtn = this.container.querySelector(".carousel-next");

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.update();

    if (this.autoplay) this.startAutoplay();
  }

  update() {
    const total = this.slides.length;
    const leftIndex = (this.current - 1 + total) % total;
    const centerIndex = this.current;
    const rightIndex = (this.current + 1) % total;

    this.track.querySelectorAll(".carousel-slide").forEach((slide, i) => {
      slide.classList.remove("left", "center", "right", "hidden");

      if (i === leftIndex) slide.classList.add("left");
      else if (i === centerIndex) slide.classList.add("center");
      else if (i === rightIndex) slide.classList.add("right");
      else slide.classList.add("hidden");
    });

    // Trigger callback with current key
    this.onChange(this.slides[this.current]);
  }

  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.update();
  }

  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.update();
  }

  startAutoplay() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), this.interval);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
  }
}
