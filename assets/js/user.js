function getUser(key) {

    getSheetJson({
        sheetID: '1OfiUk29DQ-LPz5FdS0aUxU37cvGfiqL0WRNMafcLGZ4',
        sheetNumber: 1,
        send: function() {
            $('.pageLoading').show();
        },
        complet: function() {
            $('.pageLoading').hide();
        },
        success: function(resp) {
            $('.pageLoading').hide();
            if(resp == null) {
                bindDarkSideUserView(null, 0)
                return;
            }
            resp = resp.rows.filter(function(val) {
                if(key == 1) {
                    return val.isenabledarkside == 0;
                } else if(key == 2) {
                    return val.isenabledarkside == 1;
                } else if(key == 3) {
                    return val.isenablepremiummovie == 0;
                } else if(key == 4) {
                    return val.isenablepremiummovie == 1;
                } else {
                    return true;
                }
            });
            if(key == 1 || key == 2) {
                bindDarkSideUserView(resp, key);
            } else if(key == 3 || key == 4) {
                bindPremiumUserView(resp, key);
            } else {
                bindAllUserView(resp, key);
            }
        },
        error: function(error) {
            $('.pageLoading').hide();
            alert("Error တက်နေပါသည်။")
            console.log(error);
        }
    });
    
}

function bindDarkSideUserView(data, key, isApprove) {
    var table = $('<table>', {
        'class' : 'table table-striped'
    });
    var thead = $('<thead>');
    var tr = $('<tr>');
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Name"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Device ID"));
    tr.append($('<th>', {
        'class' : 'text-right',
        'scope' : 'col'
    }).text("Action"));
    thead.append(tr);

    var tbody = $('<tbody>');
    if(data != null) {
        $.each(data, function(index, val) {
            var approveAction = $('<button>', {
                'type' : 'button',
                'class' : 'btn btn-sm btn-primary float-right'
            });
            approveAction.click(function() {
                onClickDarkSideStatus(val, key);
            });
            if(val.isenabledarkside == "0") {
                approveAction.text('Approve');
            } else {
                approveAction.text('Unapprove');
            }
            tr = $('<tr>');
            tr.append($('<td>', {
                'scope' : 'col'
            }).text(val.name));
            tr.append($('<td>').text(val.deviceid));
            tr.append($('<td>').append(approveAction));
            tbody.append(tr);
        })
    }

    table.append(thead);
    table.append(tbody);
    $('#userPage').empty();
    $('#userPage').append(table);
}

function onClickDarkSideStatus(data, key) {
    var title = "Opening Dark Side...";
    var isEnableDS = 0;
    if(data.isenabledarkside == 0) {
        isEnableDS = 1;
    }
    if(isEnableDS == 0) {
        title = "Closing Dark Side...";
    }
    sweetAlertDialog("load", "", title);
    var requestData = {
        "entry.1120130764" : isEnableDS, // userIsEnableDarkSide
        "entry.1202454362" : `${getCurrentDate(2)}-${getCurrentDate(1)}-${getCurrentDate(0)}`, // userDarkSideStartDate
    };
    $.ajax({
        url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse?edit2=` + data.usereditid,
        method: 'post',
        data: requestData,
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {
            title = "Dark Side Open Success";
            var message = "အမှောင်ကမ္ဘာဖွင့်ခြင်းအောင်မြင်ပါသည်။";
            if(isEnableDS == 0) {
                title = "Dark Side Close Success";
                message = "အမှောင်ကမ္ဘာပိတ်ခြင်းအောင်မြင်ပါသည်။";
            }
            sweetAlertDialog("success", title, message);
            getUser(key);
        },
        error: function(err) {
            sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            console.log(err);
        }
    })
}

function bindPremiumUserView(data, key) {
    var table = $('<table>', {
        'class' : 'table table-striped'
    });
    var thead = $('<thead>');
    var tr = $('<tr>');
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Name"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Device ID"));
    tr.append($('<th>', {
        'class' : 'text-right',
        'scope' : 'col'
    }).text("Action"));
    thead.append(tr);

    var tbody = $('<tbody>');
    if(data != null) {
        $.each(data, function(index, val) {
            var approveAction = $('<button>', {
                'type' : 'button',
                'class' : 'btn btn-sm btn-primary float-right'
            });
            approveAction.click(function() {
                onClickPremiumStatus(val, key);
            });
            if(val.isenablepremiummovie == 0) {
                approveAction.text('Approve');
            } else {
                approveAction.text('Unapprove');
            }
            tr = $('<tr>');
            tr.append($('<td>', {
                'scope' : 'col'
            }).text(val.name));
            tr.append($('<td>').text(val.deviceid));
            tr.append($('<td>').append(approveAction));
            tbody.append(tr);
        })
    }

    table.append(thead);
    table.append(tbody);
    $('#userPage').empty();
    $('#userPage').append(table);
}

function onClickPremiumStatus(data, key) {
    var title = "Opening Premium...";
    var isEnablePremium = 0;
    if(data.isenablepremiummovie == 0) {
        isEnablePremium = 1;
    }
    if(isEnablePremium == 0) {
        title = "Closing Premium...";
    }
    sweetAlertDialog("load", "", title);
    var requestData = {
        "entry.424896092" : isEnablePremium, // userIsEnablePremium
        "entry.938127020" : `${getCurrentDate(2)}-${getCurrentDate(1)}-${getCurrentDate(0)}`, // userPremiumStartDate
    };
    $.ajax({
        url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse?edit2=` + data.usereditid,
        method: 'post',
        data: requestData,
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {
            title = "Premium Open Success";
            var message = "Premium ဖွင့်ခြင်း အောင်မြင်ပါသည်။";
            if(isEnablePremium == 0) {
                title = "Premium Close Success";
                message = "Premium ပိတ်ခြင်း အောင်မြင်ပါသည်။";
            }
            sweetAlertDialog("success", title, message);
            getUser(key);
        },
        error: function(err) {
            sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            console.log(err);
        }
    })
}

function bindAllUserView(data, key) {
    var table = $('<table>', {
        'class' : 'table table-striped'
    });
    var thead = $('<thead>');
    var tr = $('<tr>');
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Name"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Device ID"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("DS Status"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("DS Start Date"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("DS Expire"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Premium Status"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Premium Start Date"));
    tr.append($('<th>', {
        'scope' : 'col'
    }).text("Premium Expire"));
    tr.append($('<th>', {
        'class' : 'text-right',
        'scope' : 'col'
    }).text("Action"));
    thead.append(tr);

    var tbody = $('<tbody>');
    if(data != null) {
        $.each(data, function(index, val) {
            var editAction = $('<button>', {
                'type' : 'button',
                'class' : 'btn btn-sm btn-primary float-right'
            });
            editAction.click(function() {
                onClickUpdateUserInfo(val, key);
            });
            editAction.text('Edit');

            var dsStatus = $('<span>', {
                'class' : 'dot dot-success'
            });
            if(val.isenabledarkside == 0) {
                dsStatus = $('<span>', {
                    'class' : 'dot dot-danger'
                });
            }
            dsStatus.click(function() {
                onClickDarkSideStatus(val, key);
            })

            var dsIsExpire = $('<span>', {
                'class' : 'dot dot-success'
            });
            if(calculateExpireStatus(val.darksidestartdate, val.darksideday)) {
                dsIsExpire = $('<span>', {
                    'class' : 'dot dot-danger'
                });
            }

            var premiumStatus = $('<span>', {
                'class' : 'dot dot-success'
            });
            if(val.isenablepremiummovie == 0) {
                premiumStatus = $('<span>', {
                    'class' : 'dot dot-danger'
                });
            }
            premiumStatus.click(function() {
                onClickPremiumStatus(val, key);
            })

            var premiumIsExpire = $('<span>', {
                'class' : 'dot dot-success'
            });
            if(calculateExpireStatus(val.premiummoviestartdate, val.premiummovieday)) {
                premiumIsExpire = $('<span>', {
                    'class' : 'dot dot-danger'
                });
            }

            tr = $('<tr>');
            tr.append($('<td>', {
                'scope' : 'col'
            }).text(val.name));
            tr.append($('<td>').text(val.deviceid));
            tr.append($('<td>', {
                'class' : 'text-center'
            }).append(dsStatus));
            tr.append($('<td>').text(val.darksidestartdate))
            tr.append($('<td>', {
                'class' : 'text-center'
            }).append(dsIsExpire));
            tr.append($('<td>', {
                'class' : 'text-center'
            }).append(premiumStatus));
            tr.append($('<td>').text(val.premiummoviestartdate))
            tr.append($('<td>', {
                'class' : 'text-center'
            }).append(premiumIsExpire));
            tr.append($('<td>').append(editAction));
            tbody.append(tr);
        })
    }

    table.append(thead);
    table.append(tbody);
    $('#userPage').empty();
    $('#userPage').append(table);
}

function onClickUpdateUserInfo(data, key) {
    $('#userEditID').empty();
    $('#userEditID').val(data.usereditid);

    $('#userDeviceID').empty();
    $('#userDeviceID').val(data.deviceid);

    $('#userName').empty();
    $('#userName').val(data.name);

    $('#darkSideStartDate').flatpickr({
        minDate: `today`,
        dateFormat: "Y-m-d",
        defaultDate: data.darksidestartdate
    });

    $('#premiumStartDate').flatpickr({
        minDate: `today`,
        dateFormat: "Y-m-d",
        defaultDate: data.premiummoviestartdate
    });

    $('#premiumDay').val(data.premiummovieday);
    $('#darkSideDay').val(data.darksideday);

    $('#cbEnableDS').prop('checked', false);
    if(data.isenabledarkside == 1) {
        $('#cbEnableDS').prop('checked', true);
    }

    $('#cbEnablePremium').prop('checked', false);
    if(data.isenablepremiummovie == 1) {
        $('#cbEnablePremium').prop('checked', true);
    }
    
    $('#editAccountDialog').modal('show');
}

function updateUserData() {
    var userEditID = $('#userEditID').val();
    var userDeviceID = $('#userDeviceID').val();
    var userName = $('#userName').val();
    var dsStartDate = $('#darkSideStartDate').val();
    var premiumDate = $('#premiumStartDate').val();
    var premiumDay = $('#premiumDay').val();
    var dsDay = $('#darkSideDay').val();
    var premiumStatus = 0;
    if($('#cbEnablePremium').is(':checked')) {
        premiumStatus = 1;
    }
    var dsStatus = 0;
    if($('#cbEnableDS').is(':checked')) {
        dsStatus = 1;
    }

    $('#editAccountDialog').modal('hide');

    if(userDeviceID == '' || userName == '' || dsStartDate == '' || premiumDate == '' || dsDay == '' || premiumDay == '') {
        sweetAlertDialog("error", "Form Error", "<b>UserName</b> (သို့) <b>DeviceID</b> (သို့) <b>Dark Site Date</b> (သို့) <b>Dark Site Avaliable Day</b> (သို့) <b>Premium Date</b> (သို့) <b>Premium Day</b> သည် အလွတ်ဖြစ်လို့မရပါ။");
        return;
    }

    /*dsStartDate = dsStartDate.split("-");
    premiumDate = premiumDate.split("-");*/

    sweetAlertDialog("load", "", "Updating User Data...");
    var requestData = {
        "entry.1553695841" : userDeviceID, // userDeviceID
        "entry.1850552576" : userName, // userName
        "entry.1120130764" : dsStatus, // userIsEnableDarkSide
        "entry.1202454362" : dsStartDate, // userDarkSideStartDate
        "entry.424896092" : premiumStatus, // userIsEnablePremium
        "entry.938127020" : premiumDate, // userPremiumStartDate
        "entry.1368033704" : dsDay, // userDarkSideAvaliableDay
        "entry.1460244683" : premiumDay, // userPremiumAvaliableDay
        "entry.1886838418" : 0, // userIsAvaliable
    };
    $.ajax({
        url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse?edit2=` + userEditID,
        method: 'post',
        data: requestData,
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {
            sweetAlertDialog("success", "Update Success", "Account အချက်အလက်များ ပြောင်းလဲခြင်းအောင်မြင်ပါသည်။");
            getUser(5);
        },
        error: function(err) {
            sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            console.log(err);
        }
    })
}

function processHumanDate(date) {
    date = date.split("-");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    (month < 10) ? month = `0${month}`: month = month;
    (day < 10) ? day = `0${day}`: day = day;
    var today = `${year}-${month}-${day}`;
    return today;
}

function calculateExpireStatus(startDate, numberOfDay) {
    if(numberOfDay == 0) {
        return true;
    }
    var startDay = new Date(startDate);  
    var endDay = new Date();

    // Determine the time difference between two dates     
    var millisBetween = startDay.getTime() - endDay.getTime();

    // Determine the number of days between two dates  
    var days = millisBetween / (1000 * 3600 * 24);  

    // Show the final number of days between dates
    var useDay = Math.round(Math.abs(days)) - 1
    return useDay > numberOfDay;
}
