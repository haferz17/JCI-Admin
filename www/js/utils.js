const redirect = (path) => {
    path == 'back' ?
        window.history.back() :
        window.location.replace(path)
}

function getStatus(status) {
    let data = {}
    switch (status) {
        case 'unconfirmed':
            data = {
                text: 'Laundry Belum Dikonfirmasi',
                icon: '../img/icon/unconfirmed.png',
                ill: '../img/illustration/unconfirmed.png',
                next: 'confirmed',
                nextIcon: '../img/icon/confirmed.png',
                bg: 'bg-soft',
                to: 'to-gray-200'
            }
            break;
        case 'confirmed':
            data = {
                text: 'Laundry Dikonfirmasi',
                icon: '../img/icon/confirmed.png',
                ill: '../img/illustration/confirmed.png',
                next: 'pickup',
                nextIcon: '../img/icon/pickup.png',
                bg: 'bg-soft',
                to: 'to-gray-200'
            }
            break;
        case 'canceled':
            data = {
                text: 'Laundry Dibatalkan',
                icon: '../img/icon/canceled.png',
                ill: '../img/illustration/canceled.png',
                next: '',
                nextIcon: '',
                bg: 'bg-soft-5',
                to: 'to-soft-5'
            }
            break;
        case 'pickup':
            data = {
                text: 'Laundry Dalam Pengambilan',
                icon: '../img/icon/pickup.png',
                ill: '../img/illustration/pickup.png',
                next: 'washing',
                nextIcon: '../img/icon/washing.png',
                bg: 'bg-soft',
                to: 'to-gray-200'
            }
            break;
        case 'washing':
            data = {
                text: 'Laundry Dicuci',
                icon: '../img/icon/washing.png',
                ill: '../img/illustration/washing.png',
                next: 'ironing',
                nextIcon: '../img/icon/ironing.png',
                bg: 'bg-soft-3',
                to: 'to-soft-3'
            }
            break;
        case 'ironing':
            data = {
                text: 'Laundry Disetrika',
                icon: '../img/icon/ironing.png',
                ill: '../img/illustration/ironing.png',
                next: 'delivery',
                nextIcon: '../img/icon/delivery.png',
                bg: 'bg-soft-4',
                to: 'to-soft-4'
            }
            break;
        case 'delivery':
            data = {
                text: 'Laundry Dalam Pengantaran',
                icon: '../img/icon/delivery.png',
                ill: '../img/illustration/delivery.png',
                next: 'done',
                nextIcon: '../img/icon/done.png',
                bg: 'bg-soft',
                to: 'to-gray-200'
            }
            break;
        case 'done':
            data = {
                text: 'Laundry Selesai',
                icon: '../img/icon/done.png',
                ill: '../img/illustration/done.png',
                next: '',
                nextIcon: '',
                bg: 'bg-soft',
                to: 'to-gray-200'
            }
            break;
    }
    return data
}