document.addEventListener('deviceready', onDeviceReady, false);

async function getToken() {
    return await FCM.getToken()
}

async function login() {
    // const fcm = await getToken()
    const fcm = ''
    var email = $("input#email").val()
    var password = $("input#password").val()

    $.ajax({
        url: 'http://192.168.0.170/api/auth/login',
        type: 'POST',
        data: { email, password, fcm },
        success: res => {
            console.log("res", res)
            document.getElementById('status').innerHTML = res.message
        }
    })
}

function onDeviceReady() {

}