document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const { name } = JSON.parse(localStorage.getItem('user'))
    $('#name').html(`Hi ${name}`)
}