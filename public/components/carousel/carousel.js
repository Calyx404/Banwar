document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("carousel").innerHTML = Carousel();
});

function Carousel() {
  return `
    <div class="carousel-container">
        <h4 class="carousel-title">COMMITTEES</h4>

        <div class="carousel">
            <input type="radio" class="car-radio" name="slides" id="slide-1" checked>
            <input type="radio" class="car-radio" name="slides" id="slide-2">

            <input type="radio" name="coms" class="com-radio" id="com-frontend" checked>
            <input type="radio" name="coms" class="com-radio" id="com-backend">
            <input type="radio" name="coms" class="com-radio" id="com-design">
            <input type="radio" name="coms" class="com-radio" id="com-research">

            <div class="track">
                <div class="slides">
                    <div class="slide">
                        <label for="com-frontend" class="card" title="Front-End Committee">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! -->
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Front-End Team">
                            <div class="text">
                                <h3>COMMITTEE</h3>
                                <h4>Front-End</h4>
                                <p>Click to view details</p>
                            </div>
                        </label>

                        <label for="com-backend" class="card" title="Back-End Committee">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! -->
                            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" alt="Back-End Team">
                            <div class="text">
                                <h3>COMMITTEE</h3>
                                <h4>Back-End</h4>
                                <p>Click to view details</p>
                            </div>
                        </label>
                    </div>

                    <div class="slide">
                        <label for="com-design" class="card" title="Design Committee">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! -->
                            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" alt="Design Team">
                            <div class="text">
                                <h3>COMMITTEE</h3>
                                <h4>Design</h4>
                                <p>Click to view details</p>
                            </div>
                        </label>

                        <label for="com-research" class="card" title="Research Committee">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! -->
                            <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop" alt="Research Team">
                            <div class="text">
                                <h3>COMMITTEE</h3>
                                <h4>Research</h4>
                                <p>Click to view details</p>
                            </div>
                        </label>
                    </div>

                    <div class="car-arrows">
                        <label for="slide-2" class="arrow prev for-1" title="Previous">‹</label>
                        <labe for="slide-2" class="arrow next for-1" title="Next">›</labe

                        <label for="slide-1" class="arrow prev for-2" title="Previous">‹</label>
                        <label for="slide-1" class="arrow next for-2" title="Next">›</label>
                    </div>
                </div>
            </div>

            <div class="car-dots">
                <label for="slide-1" class="dot dot-1" title="Page 1"></label>
                <label for="slide-2" class="dot dot-2" title="Page 2"></label>
            </div>

            <div class="popout">
                <article class="committee-card panel panel-frontend">
                    <div class="card-content">
                        <aside class="left">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! (GROUP PHOTO) -->
                            <div class="img-container"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Front-End Group Photo"></div>

                            <div class="purpose-container">
                                <div class="purpose-text">
                                    <div class="quote"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ab saepe dolor natus architecto ipsum cum ad quaerat tenetur iure autem laboriosam, o</p></div>
                                </div>
                            </div>

                            <div class="leader-container">
                                <!-- FEEL FREE TO REPLACE THE IMAGE! (COMMITTEE LOGO) -->
                                <div class="committee-logo"><img src="https://placehold.co/120/red/white?text=Front+End&font=Poppins" alt="Front-End Logo"></div>

                                <div class="details">
                                    <span class="label">Committee Head</span>
                                    <p class="name">Arian Dave Abat</p>
                                    <p class="role">Front-End Lead</p>
                                </div>
                            </div>
                        </aside>

                        <section class="right">
                            <div class="header">
                                <h2 class="title">Front-End Committee</h2>
                                <span class="badge">5 Members</span>
                            </div>

                            <div class="members">
                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=1" alt="Avatar"></img></div>
                                    <p class="name">Emerson L. Baliag</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=2" alt="Avatar"></img></div>
                                    <p class="name">Raven Jesrael E. Garcia</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=3" alt="Avatar"></img></div>
                                    <p class="name">Jandervien B. Lastimozo</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=4" alt="Avatar"></img></div>
                                    <p class="name">Carl Andrei V. Valdez</p>
                                    <p class="role">Member</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>

                <article class="committee-card panel panel-backend">
                    <div class="card-content">
                        <aside class="left">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! (GROUP PHOTO) -->
                            <div class="img-container"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" alt="Back-End Group Photo"></div>

                            <div class="purpose-container">
                                <div class="purpose-text">
                                    <div class="quote"><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non deleniti fuga ex. Laborum fugit eligendi magnam. Quibusdam velit ratione itaque voluptat</p></div>
                                </div>
                            </div>

                            <div class="leader-container">
                                <!-- FEEL FREE TO REPLACE THE IMAGE! (COMMITTEE LOGO) -->
                                <div class="committee-logo"><img src="https://placehold.co/120/red/white?text=Back+End&font=Poppins" alt="Back-End Logo"></div

                                <div class="details">
                                    <span class="label">Committee Head</span>
                                    <p class="name">Raymond Allen Agustin</p>
                                    <p class="role">Back-End Lead</p>
                                </div>
                            </div>
                        </aside>

                        <section class="right">
                            <div class="header">
                                <h2 class="title">Back-End Committee</h2>
                                <span class="badge">4 Members</span>
                            </div>

                            <div class="members">
                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=5" alt="Avatar"></div>
                                    <p class="name">Sander T. Listana</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="members">
                                    <div class="member">
                                        <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                        <div class="avatar"><img src="https://i.pravatar.cc/120?img=6" alt="Avatar"></div>
                                        <p class="name">Jared A. Peralta</p>
                                        <p class="role">Member</p>
                                    </div>
                                </div>

                                <div class="members">
                                    <div class="member">
                                        <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                        <div class="avatar"><img src="https://i.pravatar.cc/120?img=7" alt="Avatar"></div>
                                        <p class="name">Raymond G. Torio</p>
                                        <p class="role">Member</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>

                <article class="committee-card panel panel-design">
                    <div class="card-content">
                        <aside class="left">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! (GROUP PHOTO) -->
                            <div class="img-container"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" alt="Design Group Photo"></div>

                            <div class="purpose-content">
                                <div class="purpose-text">
                                    <div class="quote"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis tenetur dicta aliquam sequi modi aperiam maxime eos soluta nulla enim facilis neque</p></div>
                                </div>
                            </div>

                            <div class="leader-content">
                                <!-- FEEL FREE TO REPLACE THE IMAGE! (COMMITTEE LOGO) -->
                                <div class="committee-logo"><img src="https://placehold.co/120/red/white?text=Design&font=Poppins" alt="Design Logo"></div>

                                <div class="details">
                                    <span class="label">Committee Head</span>
                                    <p class="name">Allison Marie Kingkingan</p>
                                    <p class="role">Design Lead</p>
                                </div>
                            </div>
                        </aside>

                        <section class="right">
                            <div class="header">
                                <h2 class="title">Design Committee</h2>
                                <span class="badge">8 Members</span>
                            </div>

                            <div class="members">
                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=8" alt="Avatar"></div>
                                    <p class="name">Basiliza A. Binay-an</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=9" alt="Avatar"></div>
                                    <p class="name">MJ G. De Ocampo</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=10" alt="Avatar"></div>
                                    <p class="name">Christa Grace B. Ebusca</p>
                                    <p class="role">Member</p>
                                </div>
                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=11" alt="Avatar"></div>
                                    <p class="name">Gemma W. Epad</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=12" alt="Avatar"></div>
                                    <p class="name">Mayumi P. Facsoy</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=13" alt="Avatar"></div>
                                    <p class="name">Ryan Kurt L. Laoyan</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=14" alt="Avatar"></div>
                                    <p class="name">Eathan John T. Na-oy</p>
                                    <p class="role">Member</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>

                <article class="committee-card panel panel-research">
                    <div class="card-content">
                        <aside class="left">
                            <!-- FEEL FREE TO REPLACE THE IMAGE! (GROUP PHOTO) -->
                            <div class="img-container"><img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop" alt="Research Group Photo"></div>

                            <div class="purpose-container">
                                <div class="purpose-text">
                                    <div class="quote"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor officia laudantium id doloribus alias maiores, quam laboriosam quo, mollitia cumque dol</p></div>
                                </div>
                            </div>

                            <div class="leader-container">
                                <!-- FEEL FREE TO REPLACE THE IMAGE! (COMMITTEE LOGO) -->
                                <div class="committee-logo"><img src="https://placehold.co/120/red/white?text=Research&font=Poppins" alt="Research Logo"></div>

                                <div class="details">
                                    <span class="label">Committee Head</span>
                                    <p class="name">Jovic Kyle Acyapas</p>
                                    <p class="role">Research Lead</p>
                                </div>
                            </div>
                        </aside>

                        <section class="right">
                            <div class="header">
                                <h2 class="title">Research Committee</h2>
                                <span class="badge">28 Members</span>
                            </div>

                            <div class="members">
                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=14" alt="Avatar"></div>
                                    <p class="name">Grach B. Banganan</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=15" alt="Avatar"></div>
                                    <p class="name">Kochina A. Batan</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=16" alt="Avatar"></div>
                                    <p class="name">Rheniel Bay-an</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=17" alt="Avatar"></div>
                                    <p class="name">Frances Burgos</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=18" alt="Avatar"></div>
                                    <p class="name">Christopher S. Cadalig</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=19" alt="Avatar"></div>
                                    <p class="name">Harvey Cangsan</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=20" alt="Avatar"></div>
                                    <p class="name">Rhollie A. Domingo</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=21" alt="Avatar"></div>
                                    <p class="name">Wilmoore Dorencio</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=22" alt="Avatar"></div>
                                    <p class="name">Johanna Fay N. Estoque</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=23" alt="Avatar"></div>
                                    <p class="name">Justin D. Fama</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=24" alt="Avatar"></div>
                                    <p class="name">Dan Anilov Fontanos</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=25" alt="Avatar"></div>
                                    <p class="name">Jade Rhyss Francis</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=26" alt="Avatar"></div>
                                    <p class="name">Aijelle T. Gumatin</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=27" alt="Avatar"></div>
                                    <p class="name">Denise Mae Jose</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=28" alt="Avatar"></div>
                                    <p class="name">Joshua Lag-ey</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=29" alt="Avatar"></div>
                                    <p class="name">Jarmaine Reisha A. Lomayna</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=30" alt="Avatar"></div>
                                    <p class="name">Macklien Luaña</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=31" alt="Avatar"></div>
                                    <p class="name">Rhamztyn Manadao</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=32" alt="Avatar"></div>
                                    <p class="name">Rolan Mangiwet</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=33" alt="Avatar"></div>
                                    <p class="name">Gwyneth Gail D. Nana</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=34" alt="Avatar"></div>
                                    <p class="name">Romel Necer</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=35" alt="Avatar"></div>
                                    <p class="name">Rjhay Pagtiilan</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=36" alt="Avatar"></div>
                                    <p class="name">Genesis Quintero</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=37" alt="Avatar"></div>
                                    <p class="name">Jeryl Anne A. Santos</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=38" alt="Avatar"></div>
                                    <p class="name">Patrick S. Tundagui Jr.</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=39" alt="Avatar"></div>
                                    <p class="name">Mekaiah Joyce C. Ulban</p>
                                    <p class="role">Member</p>
                                </div>

                                <div class="member">
                                    <!-- FEEL FREE TO REPLACE THE IMAGE! (AVATAR) -->
                                    <div class="avatar"><img src="https://i.pravatar.cc/120?img=40" alt="Avatar"></div>
                                    <p class="name">Hans Dave P. Yamoto</p>
                                    <p class="role">Member</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    </div>
    `;
}
