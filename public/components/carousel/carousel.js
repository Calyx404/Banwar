function Carousel(slides) {
  return `
    <input type="radio" class="car-radio" name="slides" id="slide-1" checked>
    <input type="radio" class="car-radio" name="slides" id="slide-2">

    <div class="track">
      <div class="slides">
        ${slides}
      </div>
    </div>

    <div class="car-arrows">
      <label for="slide-1" class="arrow prev for-2" title="Previous">
        <img src="./assets/icons/left.svg" alt="<">
      </label>
      <label for="slide-1" class="arrow next for-2" title="Next">
        <img src="./assets/icons/right.svg" alt=">">
      </label>
    </div>

    <div class="car-dots">
      <label for="slide-1" class="dot dot-1"></label>
      <label for="slide-2" class="dot dot-2"></label>
    </div>
  `;
}
