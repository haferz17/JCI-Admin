document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const { lat, long } = JSON.parse(localStorage.getItem('loc'))
    var map = L.map('mapLeaflet', { zoomControl: false }).setView([-6.200000, 106.816666], 10);
    var marker = null
    var Latitude, Longitude

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(-6.193667, 106.823024),
            L.latLng(lat, long)
        ]
    }).addTo(map);

    document.getElementById('buttonLoc').addEventListener('click', () => {
        if (marker) map.removeLayer(marker)
        navigator.geolocation.getCurrentPosition(position => {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            marker = L.marker([Latitude, Longitude]).addTo(map)
                .bindPopup('You are here now')
                .openPopup();
            map.setView([Latitude, Longitude], 15)
        }, error => {
            console.log('code: ', error)
        }, {
            enableHighAccuracy: true
        });
    })
}
