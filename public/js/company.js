$(function () {
    debugger;
    window.U.ajax('/company/query','','POST',addData);
});
var data = [];
const addData = function (obj) {
    debugger;
    if(obj.result == 0){
        for(let i=0;i<obj.data.length;i++){
            let one = {
                "com_id" : obj.data[i].com_id,
                "com_name":obj.data[i].com_name,
                "com_phone":obj.data[i].com_phone,
                "com_time":obj.data[i].com_time
            };
            data.push(one);
        }
    }
};
function addItem() {
    //捕获页
    layer.open({
        type: 1,
        shade: false,
        area: ['95%', '95%'],
        title: false, //不显示标题
        content: $('#formOutterWrapper') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响

    });
}
function detail(data) {
    //页面层
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['600px', '340px'], //宽高
        content: $("#info").html(),
        title: '编辑快递公司信息'
    });
    $("input[name=com_name]").val(data.com_name);
    $("input[name=com_phone]").val(data.com_phone);
    $("input[name=com_time]").val(data.com_time);
    $("input[name=com_id]").val(data.com_id);
}
var app = new Vue({
    el: '#app',
    methods: {
        getNickname: function () {
            var nickname = localStorage.getItem('nickname');
            if (nickname)return nickname;
            return 'admin';
        }
    }
    , data: {
        username: 'admin'
    }
});
$("input[name=com_time]").change(function () {
    debugger;
   console.log($(this).val())
});
$("#submit").on("click",function () {
    debugger;
    let Inputs = $(".formInput");
    let data = JSON.stringify({
        'com_name':Inputs[0].value,
        'com_phone':Inputs[1].value,
        'com_time': Inputs[2].value
    });
    debugger;
    window.U.ajax('/company/add',data,'POST',function (obj) {
        debugger;
        if(obj.result == 0){
            alert("添加成功！");
            location.reload();
        }
        else{
            alert(obj.msg);
        }
    });
});
function updateS() {
    let data = JSON.stringify({
        "com_id" : $("input[name=com_id]").val(),
        "com_name":$("input[name=com_name]").val(),
        "com_phone":$("input[name=com_phone]").val(),
        "com_time":$("input[name=com_time]").val(),
    });
    console.log(data);
    debugger;
    window.U.ajax('/company/update',data,'POST',function (obj) {
        debugger;
        if(obj.result == 0){
            alert(obj.msg);
            location.reload();
        }
        else{
            alert(obj.msg);
        }
    });
};