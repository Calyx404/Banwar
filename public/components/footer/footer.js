document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("footer").innerHTML = Footer();
})

function Footer() {
    return `
        <section class="footer-item" id="footer-content">
            <div class="content-item" id="content-details">
                <div class="detail">
                    <label for="home"><img src="./assets/logos/logo-icon.png" alt="Banwar Icon" class="logo"></label>
                    <label for="home"><img src="./assets/logos/logo-name-dark.png" alt="Banwar" class="logo-name"></label>
                </div>
                <div class="detail">
                    <p>Explore the Cordillera, home of the Indigenous Igorots, through a digital map of historic sites from Francisco Antolín's Notices of the Pagan Igorots.</p>
                </div>
                <button>
                    <img src="./assets/icons/top.svg" alt="Top">
                    <span>Back to Top</span>
                </button>
            </div>

            <div class="content-item" id="content-lists">
                <div class="list">
                    <h4>Site Map</h4>
                    <div class="hr-separator"></div>
                    <ul>
                        <li><label for="home"><a href="index.html">Home</a></label></li>
                        <li><label for="maps"><a href="./map.html">Map</a></label></li>
                    </ul>
                </div>
                <div class="list">
                    <h4>Legal</h4>
                    <div class="hr-separator"></div>
                    <ul>
                        <li><a href="./legal.html#privacy-policy">Privacy Policy</a></li>
                        <li><a href="./legal.html#terms-of-use">Terms of Use</a></li>
                        <li><a href="./legal.html#licensing-notice">Licensing Notice</a></li>
                    </ul>
                </div>
                <div class="list">
                    <h4>Attributions</h4>
                    <div class="hr-separator"></div>
                    <ul>
                        <li><a target="_blank" href="https://geojson.io/">GeoJSON &nearr;</a></li>
                        <li><a target="_blank" href="https://www.openstreetmap.org">OpenStreetMaps &nearr;</a></li>
                        <li><a target="_blank" href="https://www.python.org">Python &nearr;</a></li>
                        <li><a target="_blank" href="https://nodejs.org">Node.js &nearr;</a></li>
                        <li><a target="_blank" href="https://leafletjs.com">LeafletJS &nearr;</a></li>
                        <li><a target="_blank" href="https://geopandas.org">GeoPandas &nearr;</a></li>
                        <li><a target="_blank" href="https://fastapi.tiangolo.com">FastAPI &nearr;</a></li>
                        <li><a target="_blank" href="https://pages.github.com">GitHub Pages &nearr;</a></li>
                        <li><a target="_blank" href="https://render.com/docs">Render &nearr;</a></li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="footer-item" id="footer-copyright">
            <p>&copy; 2025 Banwar Project Team. All Rights Reserved.</p>
            <p><a href="https://github.com/Calyx404/Banwar" target="_blank">View Source Code &nearr;</a></p>
        </section>
    `;
}
