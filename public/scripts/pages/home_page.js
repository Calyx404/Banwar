import { features } from "../../data/features.js";
import { sources } from "../../data/source.js";
import { team } from "../../data/team.js";
import { Carousel } from "../../components/carousel/carousel.js";

const featureCarousel = new Carousel("#feature-carousel", {});
const sourceCarousel = new Carousel("#source-carousel", {});
const teamCarousel = new Carousel("#team-carousel", {
  autoplay: false,
});
const teamContext = document.getElementById("team-context");

featureCarousel.init(features);
sourceCarousel.init(sources);
teamCarousel.init(team, (activeKey) => {
  const data = team[activeKey];
  if (!data) {
    teamContext.innerHTML = "";
    return;
  }

  const headHTML = data.head
    ? `<div class="profile">
      <div class="committee">
        <img class="committee-icon" src="./assets/${data.icon}" alt="Committee">
      </div>
      <div class="head">
        <q class="head-bio">${data.head.bio}</q>
        <div class="separator"></div>
        <div class="head-leader">
          <div class="leader-icon">
            <img src="./assets/${data.head.icon}" alt="Head">
          </div>
          <div class="leader-description">
            <h3><a href="mailto:${data.head.email}">${data.head.name}</a></h3>
            <p>${data.head.role}</p>
          </div>
        </div>
      </div>
    </div>`
    : "";

  const membersHTML = data.members
    ? `<div class="account">
        <h2 class="committee">${activeKey}</h2>
        <div class="separator"></div>
        <div class="members">
          ${data.members
            .map(
              (member) => `
            <div class="member">
              <div class="member-icon">
                <img src="./assets/${member.icon}" alt="Member">
              </div>
              <div class="member-description">
                <h3><a href="mailto:${member.email}">${member.name}</a></h3>
                <p>${member.role}</p>
              </div>
            </div>
          `
            )
            .join("")}
          </div>
      </div>`
    : "";

  teamContext.innerHTML = headHTML + membersHTML;
});
