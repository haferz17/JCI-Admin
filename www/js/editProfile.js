document.addEventListener('deviceready', onDeviceReady, false);
const user = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    $('#avatar').attr('src', user.avatar)
    $('#name').attr('value', user.name)
    $('#email').attr('value', user.email)
    $('#phone').attr('value', user.phone)
    $('#address').attr('value', user.address)
}

function update() {
    var name = $("input#name").val()
    var email = $("input#email").val()
    var phone = $("input#phone").val()
    var address = $("input#address").val()
    const avatar = 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'

    $.ajax({
        url: `${userApi}/${user.id}`,
        type: 'POST',
        data: { name, email, phone, address, avatar },
        success: res => {
            if (res.status) {
                alert('Update Successfully')
                redirect('back')
            }
        }
    })
}