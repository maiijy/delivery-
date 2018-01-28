$(function () {
    window.U.ajax('/storage/query','','POST',addData);
});
var data = [];
const addData = function (obj) {
    if(obj.result == 0){
        for(let i=0;i<obj.data.length;i++){
            let one = {
                "storage_id": obj.data[i].storage_id,
                "store_type": obj.data[i].store_type,
                "area_code": obj.data[i].area_code,
                "frame_number": obj.data[i].frame_number,
                "layer_number": obj.data[i].layer_number,
                "store_number": obj.data[i].store_number,
                "is_full": obj.data[i].is_full
            };
            data.push(one);
        }
    }
};
function addItem(){
    //捕获页

layer.open({
    type: 1,
    shade: false,
    area: ['95%', '95%'],
    title: false, //不显示标题
    content: $('#formOutterWrapper') //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响

  });
}
function detail(data){
    debugger;
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['600px', '340px'], //宽高
        content: $("#info").html(),
        title: '编辑货柜信息'
    });
    $("input[name=store_type]").val(data.store_type);
    $("input[name=area_code]").val(data.area_code);
    $("input[name=frame_number]").val(data.frame_number);
    $("input[name=layer_number]").val(data.layer_number);
    $("input[name=storage_id]").val(data.storage_id);
}


var app=new Vue({
    el:'#app',
    methods:{
        getNickname:function(){
            var nickname=localStorage.getItem('nickname');
            if(nickname)return nickname;
            return 'admin';
        }
    }
    ,data:{
        username:'admin'
    }
});

$("#submit").on("click",function () {
    let Inputs = $(".formInput");
    let data = JSON.stringify({
        'store_type':Inputs[0].value,
        'area_code':Inputs[1].value,
        'frame_number': Inputs[2].value,
        'layer_number':Inputs[3].value,
        'store_number':Inputs[4].value,
        'is_full':Inputs[5].value
    });
    console.log(data);
    debugger;
    window.U.ajax('/storage/add',data,'POST',function (obj) {
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
        'store_type':$("input[name=store_type]").val(),
        'area_code':$("input[name=area_code]").val(),
        'frame_number': $("input[name=frame_number]").val(),
        'layer_number':$("input[name=layer_number]").val(),
        'storage_id':$("input[name=storage_id]").val(),
    });
    console.log(data);
    debugger;
    window.U.ajax('/storage/update',data,'POST',function (obj) {
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