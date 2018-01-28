/**
 * Created by Administrator on 2017/12/27 0027.
 */
/**
 * Created by gaot on 2017/3/26.
 */

$(function () {
    checkID();
    //注册时检测用户名和密码
    $('input[name="username"]').change(function () {
        checkNull(this);
        checkForms(this);
    });
    //$('input[name="email"]').change(function () {
    //    CheckMail(this);
    //});
    $('input[name="password"]').change(function () {
        checkNull(this);
        checkPassword(this)
    });
    /* $('input[name="contact"]').change(function () {
     checkNull(this);
     });
     $('input[name="company"]').change(function () {
     checkNull(this);
     });*/

    //signin

    $('.submit').bind('click',function() {
        if($('input[name="remember"]').prop("checked"))
        {
            localStorage.setItem("username",$('.username').val());
            localStorage.setItem("password",$('.password').val());
        }
        var url = '/user/login';
        var data = {
            username: $('.username').val(),
            password: hex_md5($('.password').val())
        };
        // data = JSON.stringify(data);
        tempName = $('.username').val();
        fetch(url, data, 'POST', signin);
    });
    //signup
    $('.signup-submit').bind('click', function() {

        var url = '/user/register';
        var data = {
            username: $('input[name="username"]').val(),
            password: hex_md5($('input[name="password"]').val()),
            email: $('input[name="email"]').val(),
            phone: $('input[name="tel"]').val(),
            contactName: $('input[name="contactName"]').val(),
            companyName: $('input[name="companyName"]').val(),
            contactNumber: $('input[name="contactNumber"]').val()
        };
        fetch(url, data, 'POST', signup);
    });

//    findPassword
    $('.reset').bind('click', function () {
        var data = {
            username: $('input[name="username"]').val(),
            email: $('input[name="email"]').val()
        };
        var url = '/user/findSubmit';

        fetch(url, data, 'POST',findPassword);
    });


});


function findPassword (json) {
    //code==1 find error
    if(json.code ) {
        $('.message').text(json.des);
    }else if(!json.data){
        $('.message').text('failed to check the emial!');
    }else {
        $('.message').text('');
    }
}

//提交时检测空字段
function initCheck() {
    if(!$('input[name="contact"]').val()){
        checkNull($('input[name="contact"]'));
    }
    if(!$('input[name="company"]').val()){
        checkNull($('input[name="company"]'));
    }
}

//检查是否有特殊字符
function checkForms(e){
    var iu, iuu, regArray=new Array(" ","◎","■","●","№","↑","→","↓","!","@","#"+
        "$","%","^","&","*","(",")","_","-","+"+
        "=","|","[","]","？","~","`","!","<",">","‰","→","←","↑","↓","¤","§","＃","＆","＆","＼","≡","≠"+
        "≈","∈","∪","∏","∑","∧","∨","⊥","‖","‖","∠","⊙","≌","≌","√","∝","∞","∮"+
        "∫","≯","≮","＞","≥","≤","≠","±","＋","÷","×","/","Ⅱ","Ⅰ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅹ","Ⅻ","一","二"+
        "╄","╅","╇","┻","┻","┇","┭","┷","┦","┣","┝","┤","┷","┷","┹","╉","╇","【","】"+
        "三","四","五","六","七","八","九","十","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","┌","├","┬","┼","┍","┕","┗","┏","┅","—"+
        "〖","〗","←","〓","☆","§","□","‰","◇","＾","＠","△","▲","＃","℃","※",".","≈","￠");
    iuu=regArray.length;
    $(e).parent().parent().find("span").hide();
    for(iu=0;iu<=iuu;iu++){
        // var str = e.value;
        var qq =$(".test1").val();
        // if (document.Gforms.username.value.indexOf(regArray[iu])!=-1)
        var a = regArray[iu];
        if (qq.indexOf(a) >=0)
        {
            $(e).focus();
            var text = "*Can not include "+ regArray[iu]+"";
            $(e).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;" + text + "</span>");
            return false;
        }
    }
    return true;
}
//检查是否为空
function checkNull(point) {
    $(point).parent().parent().find("span").hide();
    if ($(point).val() == "") {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Can't be empty</span>");
//$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>");
        $(point).focus();
        return false;
    }

}

//jquery验证手机号码
function checkSubmitMobil(point) {
    $(point).parent().parent().find("span").hide();
    if ($(point).val() == "") {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Mobile phone number can't be empty</span>");
        // window.U.prompt("modal-mention","错误提示","手机号码不能为空！");
//$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>");
        $(point).focus();
        return false;
    }
//        ((13[0-9]{1})|159|153)+
    if (!$(point).val().match(/^(\d{11})$/)) {
        $(e).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Mobile phone number format is not correct</span>");
        // window.U.prompt("modal-mention","错误提示","手机号码格式不正确！");
        // alert("手机号码格式不正确！");
//$("#moileMsg").html("<font color='red'>手机号码格式不正确！请重新输入！</font>");
        $(point).focus();
        return false;
    }
    return true;
}
//检验邮箱
function CheckMail(mail) {
    $(mail).parent().parent().find("span").hide();
    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(mail)) return true;
    else {
        $(mail).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*E-mail format is not correct！</span>");
        // alert('您的电子邮件格式不正确');
        return false;}
}
//检验密码
function checkPassword(point) {
    $(point).parent().parent().find("span").hide();
    var pwd = $(point).val();
    if (pwd.indexOf(" ") >= 0)
    // alert("输入有空格！");
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be the input Spaces！</span>");
    // window.U.prompt("modal-mention","错误提示","密码不能输入空格！");
    if ($(point).val() == "") {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*Password cannot be empty！</span>");
        // window.U.prompt("modal-mention","错误提示","密码不能为空！");
        // alert("密码不能为空！");
        //$("#moileMsg").html("<font color='red'>手机号码不能为空！</font>");
        $(point).focus();
        return false;
    }
    if (pwd.length < 6) {
        $(point).parent().parent().append("<span class='errorInput' style='color: red;'>&nbsp;&nbsp;*The password may not be less than 6 digits！</span>");
        // window.U.prompt("modal-mention","错误提示","密码不能少于6位数！");
        // alert("密码不能少于6位数");
        $(point).focus();
        return false;
    }
    return true;
}


function checkID() {

    var usr = localStorage.getItem("username");
    var psw = localStorage.getItem("password");
    if(usr!==null)
    {
        $('.username').eq(0).val(usr);
        $('.password').eq(0).val(psw)
    }
}

$("body").keydown(function(){
    if(event.keyCode ==13){
        var submit = $(".submit");
        if(submit){
            $(".submit").trigger("click");
            submit = null;
        }else{
            // $(".signup-submit").trigger("click");
        }
    }
});