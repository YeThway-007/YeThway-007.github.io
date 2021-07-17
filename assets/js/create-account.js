$(document).ready(function () {

    const editIDRegx = /&amp;edit2=[^]*">Edit your/;
                
    $('#createAdultAccount').on('click', function() {
        var userName = $('#userName').val();
        var userDeviceID = $('#userDeviceID').val();
        var userDSPassword = $('#userDSPassword').val();
        $('#signupDialog').modal('hide');
        if(userName == "" || userDeviceID == "" || userDSPassword == "") {
            sweetAlertDialog("error", "Form Error", "<b>UserName</b> (သို့) <b>DeviceID</b> (သို့) <b>Password</b> သည် အလွတ်ဖြစ်လို့မရပါ။");
        } else {
            searchAccount(userDeviceID, function(result) {
                if(result == null) {
                    createAdultAccount(userName, userDeviceID, userDSPassword);
                } else {
                    if(result.isenabledarkside == 1) {
                        sweetAlertDialog("info", "Account Already Exist", "Account ဖွင့်ပြီးသားရှိပါသည်။ ကျေးဇူးပြု၍ Password အဟောင်းဖြင့် အမှောင်ကမ္ဘာကို ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
                    } else {
                        sweetAlertDialog("warning", "Account Pending", "Account ဖွင့်ပြီးသားရှိပါသည်။ သို့သော် <b>Admin team</b> ဖက်မှ approve ပေးခြင်းမရှိသေးပါသဖြင့် ခတ္တေခန စောင့်ဆိုင်းပေးပါ။");
                    }
                }
            }, "Account Creating...");
        }
    });

    $('#forgodPasswort').on('click', function() {
        var userDeviceID = $('#forgotPasswordUserDeviceID').val();
        $('#forgotPasswordDialog').modal('hide');
        if(userDeviceID == "") {
            sweetAlertDialog("error", "Form Error", "<b>DeviceID</b> သည် အလွတ်ဖြစ်လို့မရပါ။");
        } else {
            searchAccount(userDeviceID, function(result) {
                if(result == null) {
                    sweetAlertDialog("error", "Acount doesn't Exist", "အကောင့်ဖွင့်ထားခြင်း မရှိသေးပါ။ ကျေးဇူးပြု၍ အကောင့်ဖွင့်ပေးပါ။");
                } else {
                    sweetAlertDialog("info", "Account Password", "သင့် Password သည် <b>" + result.darksidepassword + "</b> ဖြစ်ပါသည်။ ထို Password ဖြင့် အမှောင်ကမ္ဘာကို ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
                }
            }, "Searching Account...");
        }
    });

    $('#changePassword').on('click', function() {
        var userDeviceID = $('#changePasswordUserDeviceID').val();
        var userDSPassword = $('#changePasswordUserDSPassword').val();
        $('#changePasswordDialog').modal('hide');
        if(userDeviceID == "" || userDSPassword == "") {
            sweetAlertDialog("error", "Form Error", "<b>DeviceID</b> (သို့) <b>Password</b> သည် အလွတ်ဖြစ်လို့မရပါ။");
        } else {
            searchAccount(userDeviceID, function(result) {
                if(result == null) {
                    sweetAlertDialog("error", "Acount doesn't Exist", "အကောင့်ဖွင့်ထားခြင်း မရှိသေးပါ။ ကျေးဇူးပြု၍ အကောင့်ဖွင့်ပေးပါ။");
                } else {
                    updatePassword(userDSPassword, result.usereditid);
                }
            }, "Password Changing...");
        }
    });

    /* Account create test */
    /*searchAccount("testDeviceID", function(result) {
        if(result == null) {
            createAdultAccount("testName", "testDeviceID", "testPassword");
        } else {
            if(result.isenabledarkside == 1) {
                sweetAlertDialog("info", "Account Already Exist", "Account ဖွင့်ပြီးသားရှိပါသည်။ ကျေးဇူးပြု၍ Password အဟောင်းဖြင့် အမှောင်ကမ္ဘာကို ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
            } else {
                sweetAlertDialog("warning", "Account Pending", "Account ဖွင့်ပြီးသားရှိပါသည်။ သို့သော် <b>Admin team</b> ဖက်မှ approve ပေးခြင်းမရှိသေးပါသဖြင့် ခတ္တေခန စောင့်ဆိုင်းပေးပါ။");
            }
        }
    }, "Account Creating...");*/

    /* Forgot password test */
    /*searchAccount("testDeviceID", function(result) {
        if(result == null) {
            sweetAlertDialog("error", "Acount doesn't Exist", "အကောင့်ဖွင့်ထားခြင်း မရှိသေးပါ။ ကျေးဇူးပြု၍ အကောင့်ဖွင့်ပေးပါ။");
        } else {
            sweetAlertDialog("info", "Account Password", "သင့် Password သည် <b>" + result.darksidepassword + "</b> ဖြစ်ပါသည်။ ထို Password ဖြင့် အမှောင်ကမ္ဘာကို ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
        }
    }, "Searching Account...");*/

    /* Change password test */
    /*searchAccount("testDeviceID", function(result) {
        if(result == null) {
            sweetAlertDialog("error", "Acount doesn't Exist", "အကောင့်ဖွင့်ထားခြင်း မရှိသေးပါ။ ကျေးဇူးပြု၍ အကောင့်ဖွင့်ပေးပါ။");
        } else {
            updatePassword("testPassword1", result.usereditid);
        }
    }, "Password Changing...");*/
        
    function createAdultAccount(userName, userDeviceID, userDSPassword) {
        var requestData = {
            "entry.1553695841" : userDeviceID, // userDeviceID
            "entry.1850552576" : userName, // userName
            "entry.1752144374" : userDSPassword, // userDarkSidePassword
            "entry.1120130764" : 0, // userIsEnableDarkSide
            "entry.1202454362" : `${getCurrentDate(2)}-${getCurrentDate(1)}-${getCurrentDate(0)}`, // userDarkSideStartDate
            "entry.424896092" : 0, // userIsEnablePremium
            "entry.938127020" : `${getCurrentDate(2)}-${getCurrentDate(1)}-${getCurrentDate(0)}`, // userPremiumStartDate
            "entry.1368033704" : 1000, // userDarkSideAvaliableDay
            "entry.1460244683" : 0, // userPremiumAvaliableDay
            "entry.1886838418" : 0, // userIsAvaliable
        };
        $.ajax({
            url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse`,
            method: 'post',
            data: requestData,
            beforeSend: function() {
                $('#signupDialog').modal('hide');
            },
            complete: function() {
            },
            success: function(data) {
                updateEditID(data.match(editIDRegx)[0].replace("&amp;edit2=", "").replace("\">Edit your", ""));
            },
            error: function(err) {
                console.log(err);
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            }
        })
    }

    function updatePassword(password, editID) {
        var requestData = {
            "entry.1752144374" : password // userDarkSidePassword
        };
        $.ajax({
            url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse?edit2=` + editID,
            method: 'post',
            data: requestData,
            beforeSend: function() {
            },
            complete: function() {
            },
            success: function(data) {
                sweetAlertDialog("success", "Password Change Success", "<b>Password</b> ချိန်းခြင်း အောင်မြင်ပါသည်။ မိတ်ဆွေထည့်ထားသည့် <b>Password</b> ဖြင့် ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
            },
            error: function(err) {
                console.log(err);
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            }
        })
    }

    function updateEditID(editID) {
        var requestData = {
            "entry.1156019147" : editID // userEditID
        };
        $.ajax({
            url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse?edit2=` + editID,
            method: 'post',
            data: requestData,
            beforeSend: function() {
            },
            complete: function() {
            },
            success: function(data) {
                sweetAlertDialog("success", "Account Creating Success", "အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ ကျေးဇူးပြု၍ Admin team ဖက်မှ လက်ခံခြင်း အဆင့်ကို စောင့်ဆိုင်းပေးပါ။ <b>Admin team</b> မှလက်ခံပြီးပါက မိတ်ဆွေထည့်ထားသည့် Password ဖြင့် အမှောင်ကမ္ဘာကို ဝင်ရောက်ကြည့်ရှုနိုင်ပါပြီ။");
            },
            error: function(err) {
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
                console.log(err);
            }
        })
    }

    function searchAccount(userDeviceID, callback, message = "Account creating...") {
        getSheetJson({
            sheetID: '1OfiUk29DQ-LPz5FdS0aUxU37cvGfiqL0WRNMafcLGZ4',
            sheetNumber: 1,
            send: function() {
                sweetAlertDialog("load", "", message);
            },
            complet: function() {
            },
            success: function(resp) {
                if(resp == null) {
                    callback(null);
                } else {
                    let userList = resp.rows.filter(function(val) {
                        return val.deviceid == userDeviceID;
                    });
                    if(userList.length == 0) {
                        callback(null);
                    } else {
                        callback(userList[0]);
                    }
                }
            },
            error: function(error) {
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
                console.log(error);
            }
        });
    }

    // loopDataInsert();

    function loopDataInsert() {
        getSheetJson({
            sheetID: '1OfiUk29DQ-LPz5FdS0aUxU37cvGfiqL0WRNMafcLGZ4',
            sheetNumber: 1,
            send: function() {
                sweetAlertDialog("load", "", "haha");
            },
            complet: function() {
            },
            success: function(resp) {
                if(resp != null) {
                    /*key >1000 && key <= 1100*/
                    let userList = resp.rows.filter(function(val, key) {
                        return key > 1200 && key <= 1300;
                    });
                    $.each(userList, function(key, val) {
                        var userDeviceID = userList[key].deviceid;
                        var userName = userList[key].name;
                        var userDSPassword = userList[key].darksidepassword;
                        var userIsEnableDarkSide = userList[key].isenabledarkside;
                        var userDarkSideStartDate = userList[key].darksidestartdate;
                        var userIsEnablePremium = userList[key].isenablepremiummovie;
                        var userPremiumStartDate = userList[key].premiummoviestartdate;
                        var userDarkSideAvaliableDay = userList[key].darksideday;
                        var userPremiumAvaliableDay = userList[key].premiummovieday;

                        if(userPremiumStartDate == '') {
                            userPremiumStartDate = userDarkSideStartDate;
                        }
                        if(userPremiumAvaliableDay == '') {
                            userPremiumAvaliableDay = 0;
                        }

                        updateLoL(
                            userDeviceID, 
                            userName, 
                            userDSPassword, 
                            userIsEnableDarkSide, 
                            userDarkSideStartDate, 
                            userIsEnablePremium, 
                            userPremiumStartDate,
                            userDarkSideAvaliableDay,
                            userPremiumAvaliableDay
                        )
                    })
                    swal.close();
                }
            },
            error: function(error) {
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
                console.log(error);
            }
        });
    }

    function updateLoL(
        userDeviceID, 
        userName, 
        userDSPassword, 
        userIsEnableDarkSide, 
        userDarkSideStartDate, 
        userIsEnablePremium, 
        userPremiumStartDate,
        userDarkSideAvaliableDay,
        userPremiumAvaliableDay
    ) {
        var requestData = {
            "entry.1553695841" : userDeviceID, // userDeviceID
            "entry.1850552576" : userName, // userName
            "entry.1752144374" : userDSPassword, // userDarkSidePassword
            "entry.1120130764" : userIsEnableDarkSide, // userIsEnableDarkSide
            "entry.1202454362" : userDarkSideStartDate, // userDarkSideStartDate
            "entry.424896092" : userIsEnablePremium, // userIsEnablePremium
            "entry.938127020" : userPremiumStartDate, // userPremiumStartDate
            "entry.1368033704" : userDarkSideAvaliableDay, // userDarkSideAvaliableDay
            "entry.1460244683" : userPremiumAvaliableDay, // userPremiumAvaliableDay
            "entry.1886838418" : 0, // userIsAvaliable
        };
        $.ajax({
            url: `https://cors.bridged.cc/https://docs.google.com/forms/u/0/d/e/1FAIpQLSfiGbAwryhVlc-IlXppTjy82p85d0mlxZEdn5l9Cnuo3Tw4qA/formResponse`,
            method: 'post',
            data: requestData,
            beforeSend: function() {
            },
            complete: function() {
            },
            success: function(data) {
                updateEditID(data.match(editIDRegx)[0].replace("&amp;edit2=", "").replace("\">Edit your", ""));
            },
            error: function(err) {
                console.log(err);
                sweetAlertDialog("error", "Program Error", "Program Error တက်နေပါသည်။");
            }
        })
    }

})
