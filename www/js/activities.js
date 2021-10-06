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
    data.map(item => {
        html = html + `
            <a class="cursor-pointer w-full bg-blue-50 py-2 px-2 flex items-center justify-between border-b border-white">
                <div>
                    <p>Laundry #${item.id}</p>
                    <p>by ${item.user?.name}</p>
                    <p class="capitalize text-sm text-blue-500">status: ${item.status}</p>
                </div>
                ${getNextStatus(item.status) && `<button onClick="updateStatus('${item.id}','${item.status}')" class="bg-red-100 py-1 px-2 rounded-md">
                    <p class="capitalize">${getNextStatus(item.status)}</p>
                </button>`}
            </a>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}

function updateStatus(idLaundry, status) {
    if (status !== 'done') {
        const nextStatus = getNextStatus(status)
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

function getNextStatus(status) {
    let next = ''
    switch (status) {
        case 'confirmed':
            next = 'pickup'
            break;
        case 'pickup':
            next = 'washing'
            break;
        case 'washing':
            next = 'ironing'
            break;
        case 'ironing':
            next = 'delivery'
            break;
        case 'delivery':
            next = 'done'
            break;
    }
    return next
}