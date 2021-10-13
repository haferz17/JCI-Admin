document.addEventListener('deviceready', onDeviceReady, false)

const { id } = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    fetchData()
}

function fetchData(reload) {
    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { filter: 2, id_admin: id },
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
        const ongoing0 = data[0].status !== 'done' && data[0].status !== 'canceled'
        html = html + `
        ${index == 0 && item.status !== 'done' && item.status !== 'canceled' ? '<p>Ongoing</p>' : index == 0 ? '<p>Recent</p>' : ''}
        ${index == 1 && item.status !== 'unconfirmed' ? ongoing0 ? '<p>Recent</p>' : '' : ''}
        <div class="relative">
            <a href="detail.html?${item.id}" class="bg-${index !== 0 ? 'gray-50' : ongoing0 ? 'white' : 'gray-50'} py-2.5 px-1 border rounded-md flex items-center mt-${index == 0 || index == 1 ? '2' : '0'} mb-${index == data.length - 1 ? '14' : '2'}">
                <img src="${getStatus(item.status).icon}" class="w-16 h-16 mx-2" />
                <div class="px-1.5 w-full flex justify-between">
                    <div>
                        <p class="text-sm font-bold ${getStatus(item.status).next ? '-mt-6' : ''}">Laundry #${item.id}</p>
                        <p class="text-xs text-gray-500 my-0.5">${getStatus(item.status).text}</p>
                    </div>
                    <div class="text-right ${getStatus(item.status).next ? '-mt-5' : ''}">
                        <p class="text-xs text-gray-500 mt-0.5">${moment(item.created_at).format('MMM DD')}</p>
                    </div>
                </div>
            </a>
            ${getStatus(item.status).next ? `<button onClick="updateStatus('${item.id}','${item.status}')" class="absolute bottom-2.5 left-16 ml-7 bg-soft-2 py-0.5 px-2 rounded-md mr-2 text-sm">
                <p class="capitalize">${getStatus(item.status).next}</p>
            </button>` : ''}
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}

function updateStatus(idLaundry, status) {
    if (status !== 'done') {
        const nextStatus = getStatus(status).next
        $.ajax({
            url: `${getLaundryApi}/${idLaundry}`,
            type: 'POST',
            data: { status: nextStatus },
            success: res => {
                if (res.status) {
                    fetchData('reload')
                    alert('Succesfully update status')
                }
            }
        })
    }
}