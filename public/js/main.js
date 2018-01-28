let query = [];
let addData = function (obj) {
    if(obj.result == 0){
        for(let i=0;i<obj.data.length;i++){
            let status;
            if(obj.data[i].get_status == 0){
                status = '未取走';
            }else if(obj.data[i].get_status == 1){
                status = '已取';
            }else if(obj.data[i].get_status == 2){
                status = '超时';
            }else{
                status = '寄回';
            }
            let company;
            if(obj.data[i].com_id == 1){
                company = '圆通';
            }else if(obj.data[i].com_id == 2){
                company = '顺丰';
            }
            let one = {
                "get_id": obj.data[i].get_id,
                "order_num" : obj.data[i].order_num,
                "end_name":obj.data[i].end_name,
                "end_phone":obj.data[i].end_phone,
                "start_address":obj.data[i].start_address,
                "start_name":obj.data[i].start_name,
                "start_phone":obj.data[i].start_phone,
                "com_id": company,
                "created_time": obj.data[i].created_time,
                "get_status": status,
                "get_time": obj.data[i].get_time,
                "start_idcard":obj.data[i].start_idcard,
                "storage_id":obj.data[i].storage_id,
                "end_address":obj.data[i].end_address,
            };
            query.push(one);
        }
    }
};
$(function () {
    layui.use('element', function(){
        var element = layui.element;

        //…
    });
    layui.use('table', function(){
        var table = layui.table;
        //第一个实例
        table.render({
            elem: '#demo'
            ,height: 415
            ,data: query
            ,page: true //开启分页
            ,cols: [[ //表头
                {field: 'get_id', title: '编号', width:'6%',align:'center'}
                ,{field: 'order_num', title: '快递单号', width:'10%', sort: true,align:'center'}
                ,{field: 'end_name', title: '收件人姓名', width:'10%',align:'center'}
                ,{field: 'end_phone', title: '收件人联系方式', width:'14%', sort: true,align:'center'}
                ,{field: 'start_address', title: '寄件地址', width:'10%',align:'center'}
                ,{field: 'com_id', title: '快递公司', width:'10%', sort: true,align:'center'}
                ,{field: 'created_time', title: '收件时间', width:'10%', sort: true,align:'center'}
                ,{field: 'get_status', title: '快递状态', width:'10%',align:'center'}
                ,{field: 'get_time', title: '取件时间', width:'10%', sort: true,align:'center'}
                ,{fixed: 'right', width:'10%', align:'center', toolbar: '#barDemo'}
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
    window.U.ajax('/get/query','','POST',addData);
});
function addItem() {
    //捕获页
    debugger;
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
    Bs[8].innerHTML = data.created_time;
    if(data.get_status === 0){
        Bs[9].innerHTML = '未取走';
    }else{
        Bs[9].innerHTML = '已取走';
    }
    Bs[10].innerHTML = data.get_time;
    Bs[11].innerHTML = data.com_id;
    Bs[12].innerHTML = data.storage_id;
    console.log(data);
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['600px', '340px'], //宽高
        content: $("#info").html(),
        title: '快递详细信息'
    });
}
function signIt(num){
    if(num.get_status == '未取走'){
        let get_id = num.get_id;
        let data = JSON.stringify({
            'get_id':get_id,
        });
        window.U.ajax('/get/sign',data,'POST',window.U.alertMsg);
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
    debugger;
    let Inputs = $(".formInput");
    let r1 = checkNULL(Inputs[0].value);
    let r2 = checkNULL(Inputs[2].value);
    let r3 = checkNULL(Inputs[3].value);
    let r4 = checkNULL(Inputs[4].value);
    let r5 = checkNULL(Inputs[10].value);
    if(r1&&r2&&r3&&r4&&r5){
        let data = JSON.stringify({
            'order_num':Inputs[0].value,
            'start_address': Inputs[1].value?Inputs[1].value:'',
            'end_address':Inputs[2].value,
            'end_name':Inputs[3].value,
            'end_phone':Inputs[4].value,
            'start_name':Inputs[5].value?Inputs[5].value:'',
            'start_phone':Inputs[6].value?Inputs[6].value:null,
            'start_idcard':Inputs[7].value?Inputs[7].value:null,
            'storage_id':Inputs[8].value?Inputs[8].value:'',
            'get_status':Inputs[9].value?Inputs[9].value:0,
            'com_id':Inputs[10].value,
        });
        window.U.ajax('/get/add',data,'POST',window.U.alertMsg);
    }else {
        alert("请填写带*必填字段");
    }
});
$("#queryBtn").on("click",function () {
   let name = $("#getName").val();
   let phone = $("#getPhone").val();
    let data = JSON.stringify({
        'name':name,
        'phone':phone,
    });
    window.U.ajax('/get/search',data,'POST',search);
});
let search = function (obj) {
    debugger;
    if(obj.result == 0){
        query.splice(0,query.length);
        console.log(query);
        for(let i=0;i<obj.data.length;i++){
            let one = {
                "hidden": obj.data[i].get_id,
                "id" : obj.data[i].order_num,
                "username":obj.data[i].end_name,
                "sex":obj.data[i].end_phone,
                "city":obj.data[i].start_address,
                "experience": obj.data[i].com_id,
                "score": obj.data[i].created_time,
                "classify": obj.data[i].get_status,
                "wealth": obj.data[i].get_time,
            };
            query.push(one);
        }
        layui.use('table', function(){
            var table = layui.table;
            //第一个实例
            table.render({
                elem: '#demo'
                ,height: 415
                ,data: query
                ,page: true //开启分页
                ,cols: [[ //表头
                    {field: 'hidden', title: '编号', width:'6%',align:'center'}
                    ,{field: 'id', title: '快递单号', width:'10%', sort: true,align:'center'}
                    ,{field: 'username', title: '收件人姓名', width:'10%',align:'center'}
                    ,{field: 'sex', title: '收件人联系方式', width:'14%', sort: true,align:'center'}
                    ,{field: 'city', title: '寄件地址', width:'10%',align:'center'}
                    ,{field: 'experience', title: '快递公司', width:'10%', sort: true,align:'center'}
                    ,{field: 'score', title: '收件时间', width:'10%', sort: true,align:'center'}
                    ,{field: 'classify', title: '快递状态', width:'10%',align:'center'}
                    ,{field: 'wealth', title: '取件时间', width:'10%', sort: true,align:'center'}
                    ,{fixed: 'right', width:'10%', align:'center', toolbar: '#barDemo'}
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