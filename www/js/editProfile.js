document.addEventListener('deviceready', onDeviceReady, false);
const user = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    $('#avatar').attr('src', user.avatar)
    $('#name').attr('value', user.name)
    $('#email').attr('value', user.email)
    $('#phone').attr('value', user.phone)
    $('#address').attr('value', user.address)
    showMaps()
}

function showMaps() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        localStorage.setItem('lat', latitude.toString())
        localStorage.setItem('long', longitude.toString())
        map.setView([Latitude, Longitude], 15)
    }, error => {
        console.log('code: ', error)
    }, {
        enableHighAccuracy: true
    })

    const lat = parseFloat(localStorage.getItem('lat'))
    const long = parseFloat(localStorage.getItem('long'))
    let marker = null
    let map = L.map('mapLeaflet', { zoomControl: false }).setView([lat, long], 12)

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function (e) {
        localStorage.setItem('setLat', e.latlng.lat.toString())
        localStorage.setItem('setLong', e.latlng.lng.toString())
        if (marker) map.removeLayer(marker)
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
            .bindPopup(e.latlng.lat + ", " + e.latlng.lng)
            .openPopup()
    })
}

function update() {
    const name = $("input#name").val()
    const email = $("input#email").val()
    const phone = $("input#phone").val()
    const address = $("input#address").val()
    const latitude = parseFloat(localStorage.getItem('setLat'))
    const longitude = parseFloat(localStorage.getItem('setLong'))
    const avatar = 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'

    $.ajax({
        url: `${userApi}/${user.id}`,
        type: 'POST',
        data: { name, email, phone, address, avatar, latitude, longitude },
        success: res => {
            if (res.status) {
                alert('Update Successfully')
                localStorage.setItem('lat', '')
                localStorage.setItem('long', '')
                localStorage.setItem('setLat', '')
                localStorage.setItem('setLong', '')
                redirect('back')
            }
        }
    })
}