$(function () {
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){
        let element = layui.element;

        //…
    });
    layui.use('table', function(){
        let table = layui.table;

        //第一个实例
        table.render({
            elem: '#demo'
            ,height: 415
            ,data: data
            ,page: true //开启分页
            ,cols: [[ //表头
                {field: 'send_id', title: '编号', width:'6%',align:'center'}
                ,{field: 'order_num', title: '快递单号', width:'10%', sort: true, align:'center'}
                ,{field: 'start_name', title: '寄件人姓名', width:'10%',align:'center'}
                ,{field: 'start_phone', title: '寄件人联系方式', width:'13%', sort: true,align:'center'}
                ,{field: 'end_address', title: '收件地址', width:'8%',align:'center'}
                ,{field: 'order_type', title: '货物类型', width:'8%',align:'center'}
                ,{field: 'send_status', title: '快递状态', width:'8%', sort: true,align:'center'}
                ,{field: 'com_id', title: '快递公司', width:'9%', sort: true,align:'center'}
                ,{field: 'created_time', title: '寄件时间', width:'10%',align:'center'}
                ,{field: 'send_time', title: '寄出时间', width:'10%', sort: true,align:'center'}
                ,{fixed: 'right', width:'9%',align:'操作人', toolbar: '#barDemo'}
            ]]
        });

        table.on('tool(demo)', function(obj){
            if(obj.event === 'detail'){
                let newData = obj.data;
                detail(newData);
            }else if(obj.event === 'signBtn'){
                let newData = obj.data;
                signIt(newData);
            }
        });

    });
    window.U.ajax('/send/query','','POST',addData);
});
let data = [];
let addData = function (obj) {
    debugger;
    if(obj.result == 0){
        for(let i=0;i<obj.data.length;i++){
            let status;
            if(obj.data[i].send_status == 0){
                status = '未取走';
            }else{
                status = '已取走';
            }
            let pay;
            if(obj.data[i].is_pay == 0){
                pay = '先付';
            }else{
                pay = '到付';
            }
            let one = {
                "send_id": obj.data[i].send_id,
                "order_num" : obj.data[i].order_num,
                "start_name":obj.data[i].start_name,
                "start_phone":obj.data[i].start_phone,
                "end_address":obj.data[i].end_address,
                "order_type":obj.data[i].order_type,
                "send_status": status,
                "com_id": obj.data[i].com_id,
                "created_time": obj.data[i].created_time,
                "send_time":obj.data[i].send_time,

                "start_address": obj.data[i].start_address,
                "start_idcard": obj.data[i].start_idcard,
                "end_name": obj.data[i].end_name,
                "end_phone": obj.data[i].end_phone,
                "is_pay": pay,
                // "start_id": obj.data[i].start_id,
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
    window.U.ajax('/company/query','','POST',addCompany);

}
function addCompany(obj) {
    if(obj.result == 0){
        for (let i = 0; i < obj.data.length; i++) {
            debugger;
            let com_id = obj.data[i].com_id;
            let com_name = obj.data[i].com_name;
            $("#com_id").prepend('<option value="'+com_id+'">'+com_name+'</option>');
        }
    }
}
function detail(data) {
    //页面层
    let Bs = $("#info b");
    Bs[0].innerHTML = data.order_num;
    Bs[1].innerHTML = data.start_address;
    Bs[2].innerHTML = data.start_name;
    Bs[3].innerHTML = data.start_phone;
    Bs[4].innerHTML = data.start_idcard;
    Bs[5].innerHTML = data.end_address;
    Bs[6].innerHTML = data.end_name;
    Bs[7].innerHTML = data.end_phone;
    Bs[8].innerHTML = data.order_type;
    Bs[9].innerHTML = data.is_pay;
    Bs[10].innerHTML = data.send_status;
    Bs[11].innerHTML = data.com_id;
    Bs[12].innerHTML = data.created_time;
    Bs[13].innerHTMl = data.send_time;
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['600px', '340px'], //宽高
        content: $("#info").html(),
        title: '快递详细信息'
    });
}
function signIt(num){
    if(num.send_status == '未取走'){
        let send_id = num.send_id;
        let data = JSON.stringify({
            'send_id':send_id,
        });
        window.U.ajax('/send/sign',data,'POST',window.U.alertMsg);
    }else{
        alert("无需进行此项操作");
    }
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
function checkNULL(input) {
    if(input == ''){
        return false;
    }else {
        return true
    }
}
$("#submit").on("click",function () {
    let Inputs = $(".formInput");
    let flag=0;
    debugger;
    for (let i = 0; i < Inputs.length; i++) {
        let res = checkNULL(Inputs[i].value);
        if (res == true) {
            flag++;
        }
    }
    if(flag >= 10){
        let data = JSON.stringify({
            'order_num':Inputs[0].value,
            'order_type':Inputs[1].value,
            'start_address': Inputs[2].value,
            'start_name':Inputs[3].value,
            'start_phone':Inputs[4].value,
            'start_idcard':Inputs[5].value,
            'end_address':Inputs[6].value,
            'end_name':Inputs[7].value,
            'end_phone':Inputs[8].value,
            'is_pay':Inputs[9].value?Inputs[9].value:0,
            'send_status':Inputs[10].value?Inputs[10].value:0,
            'com_id':Inputs[11].value,
            'start_id':null,
        });
        window.U.ajax('/send/add',data,'POST',window.U.alertMsg);
    }else{
        alert("请填写带*必填字段");
    }
});
$("#queryBtn").on("click",function () {
    debugger;
    let name = $("#getName").val();
    let phone = $("#getPhone").val();
    let data = JSON.stringify({
        'name':name,
        'phone':phone,
    });
    window.U.ajax('/send/search',data,'POST',search);

});
let search = function (obj) {
    if(obj.result == 0){
        data.splice(0,data.length);
        console.log(data);
        for(let i=0;i<obj.data.length;i++){
            let one = {
                "id" : obj.data[i].order_num,
                "username":obj.data[i].start_name,
                "sex":obj.data[i].start_phone,
                "city":obj.data[i].end_address,
                "sign":obj.data[i].order_type,
                "experience": obj.data[i].send_status,
                "score": obj.data[i].com_id,
                "classify": obj.data[i].created_time,
                "wealth": obj.data[i].send_time,
            };
            data.push(one);
        }
        layui.use('table', function(){
            var table = layui.table;

            //第一个实例
            table.render({
                elem: '#demo'
                ,height: 415
                ,data: data
                ,page: true //开启分页
                ,cols: [[ //表头
                    {field: 'hidden', title: '编号', width:'4%',align:'center'}
                    ,{field: 'id', title: '快递单号', width:'10%', sort: true, align:'center'}
                    ,{field: 'username', title: '寄件人姓名', width:'10%',align:'center'}
                    ,{field: 'sex', title: '寄件人联系方式', width:'13%', sort: true,align:'center'}
                    ,{field: 'city', title: '收件地址', width:'8%',align:'center'}
                    ,{field: 'sign', title: '货物类型', width:'8%',align:'center'}
                    ,{field: 'experience', title: '快递状态', width:'8%', sort: true,align:'center'}
                    ,{field: 'score', title: '快递公司', width:'9%', sort: true,align:'center'}
                    ,{field: 'classify', title: '寄件时间', width:'9%',align:'center'}
                    ,{field: 'wealth', title: '寄出时间', width:'9%', sort: true,align:'center'}
                    ,{fixed: 'right', width:'9%',align:'操作人', toolbar: '#barDemo'}
                ]]
            });

            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'detail'){
                    debugger;
                    detail(data);
                }
            });

        });
    }
};