/**
 * Created by Administrator on 2017/12/20 0020.
 */
window.U = {
    ajax: function (url, data, method, cb) {
        $.ajax({
            url: url,
            method: method,
            data: data,
            contentType:"application/json",
            dataType:'json',
            success: function (json) {
                if(cb) {
                    cb(json);
                }
            },
            error: function (json) {

            }
        });
    },
    getOrderId: function () {
        var href = window.location.href.split('/'),
            len = href.length;
        return href[len-1];
    },
    formatDate: function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return  year + "-" + month + "-" + day;
    },
    alertMsg: function(obj) {
        if(obj.result == 0){
            alert(obj.msg);
            location.reload();
        }
        else{
            alert(obj.msg);
        }
    }
};