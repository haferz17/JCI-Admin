document.addEventListener('deviceready', onDeviceReady, false)

const { id } = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    fetchData()
}

function fetchData() {
    $.ajax({
        url: getNotifApi,
        type: 'POST',
        data: { id },
        success: res => {
            if (res.status) renderList(res.data)
        }
    })
}

function renderList(data) {
    let html = ''
    data.map(item => {
        html = html + `
        <div class="bg-white py-3 border-b flex items-center justify-between">
            <div class="bg-yellow-100 h-10 w-10 flex items-center justify-center rounded-full">
                <i class="bi-bell-fill text-xl text-yellow-500 font-bold"></i>
            </div>
            <div class="px-3 w-11/12">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-bold">${item.title}</p>
                    <p class="text-xs text-gray-500 mt-0.5">${moment(item.created_at).format('MMM DD')}</p>
                </div>
                <p class="text-xs text-gray-500 my-0.5">${item.description}</p>
            </div>
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}
