document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("footer").innerHTML = Footer();
});

function Footer() {
  return `
        <section class="footer-item" id="footer-content">
            <div class="content-item" id="content-details">
                <div class="detail">
                    <img src="./assets/logos/logo-icon.png" alt="Banwar Icon" class="logo" onclick="document.location='./index.html'">
                    <img src="./assets/logos/logo-name-dark.png" alt="Banwar" class="logo-name" onclick="document.location='./index.html'">
                </div>
                <div class="detail">
                    <p class="message">Explore the Cordillera, home of the Indigenous Igorots, through a digital map of historic sites from Francisco Antolín's Notices of the Pagan Igorots.</p>
                </div>
                <button onclick="document.location='#main'">
                    <img src="./assets/icons/top.svg" alt="Top">
                    <span>Back to Top</span>
                </button>
            </div>

            <div class="content-item" id="content-lists">
                <div class="list">
                    <h4>Site Map</h4>
                    <div class="separator"></div>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="./map.html">Map</a></li>
                    </ul>
                </div>
                <div class="list">
                    <h4>Legal</h4>
                    <div class="separator"></div>
                    <ul>
                        <li><a href="./legal.html#privacy-policy">Privacy Policy</a></li>
                        <li><a href="./legal.html#terms-of-use">Terms of Use</a></li>
                        <li><a href="./legal.html#licensing-notice">Licensing Notice</a></li>
                    </ul>
                </div>
                <div class="list">
                    <h4>Attributions</h4>
                    <div class="separator"></div>
                    <ul>
                        <li><a target="_blank" href="https://leafletjs.com">LeafletJS &nearr;</a></li>
                        <li><a target="_blank" href="https://www.openstreetmap.org">OpenStreetMap &nearr;</a></li>
                        <li><a target="_blank" href="https://opentopomap.org">OpenTopoMap &nearr;</a></li>
                        <li><a target="_blank" href="https://www.esri.com/en-us/home">Esri ArcGIS &nearr;</a></li>
                        <li><a target="_blank" href="https://geojson.io/">GeoJSON &nearr;</a></li>
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
