document.addEventListener('deviceready', onDeviceReady, false);
const user = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    $('#avatar').attr('src', user.avatar)
    $('#name').attr('value', user.name)
    $('#email').attr('value', user.email)
    $('#phone').attr('value', user.phone)
    $('#address').attr('value', user.address)
    localStorage.setItem('imgProfile', '')
    showMaps()
}

function showMaps() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        localStorage.setItem('lat', latitude.toString())
        localStorage.setItem('long', longitude.toString())
        map.setView([latitude, longitude], 15)
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
    marker = L.marker([user.latitude, user.longitude]).addTo(map)
        .bindPopup(user.latitude + ", " + user.longitude)
        .openPopup()

    map.on('click', function (e) {
        localStorage.setItem('setLat', e.latlng.lat.toString())
        localStorage.setItem('setLong', e.latlng.lng.toString())
        if (marker) map.removeLayer(marker)
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
            .bindPopup(e.latlng.lat + ", " + e.latlng.lng)
            .openPopup()
    })
}

function openCamera() {
    navigator.camera.getPicture((res) => {
        $('#avatar').attr('src', 'data:image/png;base64, ' + res)
        localStorage.setItem('imgProfile', `data:image/png;base64, ${res}`)
        $('#placeholder').html(``)
    }, (e) => {
    }, {
        quality: 10,
        cameraDirection: 1,
        destinationType: 0,
        correctOrientation: true
    })
}

function update() {
    const name = $("input#name").val()
    const email = $("input#email").val()
    const phone = $("input#phone").val()
    const address = $("input#address").val()
    const latitude = parseFloat(localStorage.getItem('setLat')) || user.latitude
    const longitude = parseFloat(localStorage.getItem('setLong')) || user.longitude
    const temp = localStorage.getItem('imgProfile') || ''
    const avatar = temp || user.avatar || 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'

    $.ajax({
        url: `${userApi}/${user.id}`,
        type: 'POST',
        data: { name, email, phone, address, avatar, latitude, longitude },
        success: res => {
            if (res.status) {
                toast('Update Successfully')
                localStorage.setItem('lat', '')
                localStorage.setItem('long', '')
                localStorage.setItem('setLat', '')
                localStorage.setItem('setLong', '')
                redirect('back')
            }
        }
    })
}