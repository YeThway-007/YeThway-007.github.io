function sweetAlertDialog(type, title = "", message = "") {
    switch (type) {
        case 'load':
            swal.fire({
                title: '',
                html: '<div class="save_loading"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div><div><h4>' + message + '</h4></div>',
                showConfirmButton: false,
                allowOutsideClick: false
            });
        break;
        default:
            swal.fire({
                icon: type,
                title: title,
                html: message
            })
    }
}

function encrypt(data) {
    return AES256.encrypt(data, 'lol@msubYoteShin');
}

function decrypt(data) {
    return AES256.decrypt(data, 'lol@msubYoteShin');
}

function getCurrentDate(index) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    
    switch(index) {
        case 0:
            return dd;
            break;
        case 1:
            return mm;
            break;
        default:
            return yyyy;
    }
}