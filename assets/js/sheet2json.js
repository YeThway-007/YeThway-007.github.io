function getSheetJson(callback) {
    var query = "",
        sheetID = callback.sheetID,
        sheetNumber = callback.sheetNumber,
        useIntegers = false,
        showColumns = false,
        showRows = true;
    var send = function() {}
    var complete = function() {}
    var success = function(res) {}
    var error = function(err) {}
    if ('query' in callback) {
        query = callback.query;
    }
    if ('useIntegers' in callback) {
        useIntegers = callback.useIntegers;
    }
    if ('showRows' in callback) {
        showRows = callback.showRows;
    }
    if ('showColumns' in callback) {
        showColumns = callback.showColumns;
    }
    if ('send' in callback) {
        send = callback.send;
    }
    if ('complete' in callback) {
        complete = callback.complete;
    }
    if ('success' in callback) {
        success = callback.success;
    }
    if ('error' in callback) {
        error = callback.error;
    }
    $.ajax({
        url: `https://spreadsheets.google.com/feeds/list/${sheetID}/${sheetNumber}/public/values?alt=json`,
        method: 'get',
        beforeSend: function() {
            send();
        },
        complete: function() {
            complete();
        },
        success: function(data) {
            // console.log(data);
            var responseObj = {};
            var rows = [];
            var columns = {};
            if (data && data.feed && data.feed.entry) {
                for (var i = 0; i < data.feed.entry.length; i++) {
                    var entry = data.feed.entry[i];
                    var keys = Object.keys(entry);
                    var newRow = {};
                    var queried = false;
                    for (var j = 0; j < keys.length; j++) {
                        var gsxCheck = keys[j].indexOf('gsx$');
                        if (gsxCheck > -1) {
                            var key = keys[j];
                            var name = key.substring(4);
                            var content = entry[key];
                            var value = content.$t;
                            if (value.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                                queried = true;
                            }
                            if (useIntegers === true && !isNaN(value)) {
                                value = Number(value);
                            }
                            newRow[name] = value;
                            if (queried === true) {
                                if (!columns.hasOwnProperty(name)) {
                                    columns[name] = [];
                                    columns[name].push(value);
                                } else {
                                    columns[name].push(value);
                                }
                            }
                        }
                    }
                    if (queried === true) {
                        rows.push(newRow);
                    }
                }
                if (showColumns === true) {
                    responseObj['columns'] = columns;
                }
                if (showRows === true) {
                    responseObj['rows'] = rows;
                }
                success(responseObj);
            } else {
                success(null);
            }
        },
        error: function(err) {
            console.log(err);
            error(err);
        }
    });
}
