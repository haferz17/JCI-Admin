document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    fetchData()
}

function fetchData(reload) {
    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { filter: 1 },
        success: res => {
            if (res.status) {
                renderList(res.data)
                reload && window.location.reload()
            }
        }
    })
}

function renderList(data) {
    let html = ''
    data.map(item => {
        html = html + `
            <a class="cursor-pointer w-full bg-blue-50 py-2 px-2 flex items-center justify-between border-b-2 border-white">
                <div>
                    <p>Laundry #${item.id}</p>
                    <p>by ${item.user?.name}</p>
                </div>
                <button onClick="javascript:confirm(${item.id})" class="bg-red-100 py-1 px-2 rounded-md">
                    <p>Confirm</p>
                </button>
            </a>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}

function confirm(idLaundry) {
    const { id } = JSON.parse(localStorage.getItem('user'))
    $.ajax({
        url: `${getLaundryApi}/${idLaundry}`,
        type: 'POST',
        data: { id_admin: id, status: 'confirmed' },
        success: res => {
            if (res.status) {
                fetchData('reload')
                alert('Succesfully confirmed')
            }
        }
    })
}