import { team } from "../../data/team.js";
import { Carousel } from "../../components/carousel/carousel.js";

const contextEl = document.getElementById("team-context");
const carousel = new Carousel("#team-carousel", {
  autoplay: true,
  interval: 4000,
});

carousel.init(team, (activeKey) => {
  const data = team[activeKey];
  if (!data) {
    contextEl.innerHTML = "";
    return;
  }

  const headHTML = data.head
    ? `<div class="head"><h3>${data.head.name}</h3><p>${data.head.bio}</p></div>`
    : "";

  const membersHTML = data.members
    ? `<div class="members">
        ${data.members
          .map(
            (m) => `
          <div class="member">
            <img src="./assets/icons/${m.icon}" alt="${m.name}">
            <h5>${m.name}</h5>
            <p>${m.role}</p>
          </div>
        `
          )
          .join("")}
      </div>`
    : "";

  contextEl.innerHTML = headHTML + membersHTML;
});

// FOR PARALLAX SCROLLING
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: false,
  offset: 100,
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
});

document.querySelectorAll('.parallax-element').forEach(el => {
  el.setAttribute('data-aos', 'fade-up');
  el.setAttribute('data-aos-delay', '0');
  el.setAttribute('data-aos-duration', '1000');
  el.setAttribute('data-aos-parallax', 'true');
});
