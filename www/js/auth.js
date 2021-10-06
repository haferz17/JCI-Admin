async function getToken() {
    return await FCM.getToken()
}

async function login() {
    // const fcm = await getToken()
    const fcm = ''
    var email = $("input#email").val()
    var password = $("input#password").val()

    $.ajax({
        url: doLoginApi,
        type: 'POST',
        data: { email, password, fcm },
        success: res => {
            if (res.status) {
                localStorage.setItem('user', JSON.stringify(res.data[0]))
                window.location.href = 'home.html'
            }
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
            console.log("res", res)
            if (res.status) {
                alert('Register Successfully')
                window.location.href = 'login.html'
            }
        }
    })
}