document.addEventListener('deviceready', onDeviceReady, false);
const user = JSON.parse(localStorage.getItem('user'))
const avatar = 'https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg'

function onDeviceReady() {
    $('#name').html(user.name)
    $('#role').html(user.role)
    $('#avatar').attr('src', user.avatar || avatar)
    fetchData()
}

function fetchData() {
    $.ajax({
        url: `${userApi}/${user.id}`,
        type: 'GET',
        success: res => {
            if (res.status) {
                const data = res.data[0]
                localStorage.setItem('user', JSON.stringify(data))
                $('#name').html(data.name)
                $('#role').html(`#${data.role}`)
                $('#avatar').attr('src', data.avatar || avatar)
            }
        }
    })
}

function logout() {
    localStorage.setItem('user', '')
    redirect('login.html')
}