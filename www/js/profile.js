document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const { name, role, email, avatar } = JSON.parse(localStorage.getItem('user'))
    $('#name').html(name)
    $('#role').html(role)
    $('#email').html(email)
    $('#avatar').attr('src', avatar)
}