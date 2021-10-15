document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (Object.keys(user).length) redirect('home.html')
}

async function getToken() {
    return await FCM.getToken()
}

async function login() {
    const fcm = await getToken()
    var email = $("input#email").val()
    var password = $("input#password").val()

    $.ajax({
        url: doLoginApi,
        type: 'POST',
        data: { email, password, fcm: fcm || '' },
        success: res => {
            if (res.status) {
                localStorage.setItem('user', JSON.stringify(res.data[0]))
                window.location.href = 'home.html'
            } else toast('Login Failed')
        }
    })
}

function register() {
    var name = $("input#name").val()
    var email = $("input#email").val()
    var password = $("input#password").val()

    $.ajax({
        url: doRegisterApi,
        type: 'POST',
        data: { name, email, password, role: 'admin' },
        success: res => {
            if (res.status) {
                toast('Register Successfully')
                redirect('login.html')
            } else toast('Register Failed')
        }
    })
}