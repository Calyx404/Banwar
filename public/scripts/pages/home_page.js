import { team } from "../../data/team.js";
import { Carousel } from "../../components/carousel/carousel.js";

const contextEl = document.getElementById("team-context");
const carousel = new Carousel("#team-carousel", {
  autoplay: false,
  interval: 4000,
});

carousel.init(team, (activeKey) => {
  const data = team[activeKey];
  if (!data) {
    contextEl.innerHTML = "";
    return;
  }

  const headHTML = data.head
    ? `<div class="profile">
      <div class="committee">
        <img class="committee-icon" src="./assets/icons/${data.icon}" alt="Committee">
      </div>
      <div class="head">
        <q class="head-bio">${data.head.bio}</q>
        <div class="separator"></div>
        <div class="head-leader">
          <div class="leader-icon">
            <img src="./assets/icons/${data.head.icon}" alt="Head">
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
                <img src="./assets/icons/${member.icon}" alt="Member">
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

  contextEl.innerHTML = headHTML + membersHTML;
});
