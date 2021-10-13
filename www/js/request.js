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
    data.map((item, index) => {
        html = html + `
        <div class="relative">
            <a href="detail.html?${item.id}" class="bg-white py-2.5 px-1 border rounded-md flex items-center mt-${index == 0 || index == 1 ? '2' : '0'} mb-${index == data.length - 1 ? '14' : '2'}">
                <img src="${getStatus(item.status).icon}" class="w-16 mx-2" />
                <div class="px-1.5 w-full flex justify-between">
                    <div>
                        <p class="text-sm font-bold ${item.status == 'unconfirmed' ? '-mt-6' : ''}">Laundry #${item.id}</p>
                        <p class="text-xs text-gray-500 my-0.5">${getStatus(item.status).text}</p>
                    </div>
                    <div class="text-right ${item.status == 'unconfirmed' ? '-mt-5' : ''}">
                        <p class="text-xs text-gray-500 mt-0.5">${moment(item.created_at).format('MMM DD')}</p>
                    </div>
                </div>
            </a>
            ${item.status == 'unconfirmed' ? `<button onClick="confirm('${item.id}')" class="absolute bottom-2.5 left-16 ml-7 bg-soft-2 py-0.5 px-2 rounded-md mr-2 text-sm">
                <p class="capitalize">Confirm</p>
            </button>` : ''}
        </div>
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